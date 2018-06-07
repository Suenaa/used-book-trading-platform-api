import { Context } from 'koa';
import { retrieveOneUserById, createOneUser, retrieveOneUserWithPwd } from '../models/user.model';
import { SoftError } from '../error';
import * as md5 from 'md5';

export async function login(ctx: Context, next: () => Promise<any>) {
  const studentId: number = ctx.request.body.username;
  const password: string = ctx.request.body.password;

  const user = await retrieveOneUserWithPwd(studentId);

  if (!user) {
    throw SoftError.create(ctx, '没有这个用户');
  }

  if (md5(password) !== user.password) {
    throw SoftError.create(ctx, '密码错误');
  }

  ctx.body = '登陆成功';
  ctx.session.user = user;

  return next();
}

export async function register(ctx: Context, next: () => Promise<any>) {
  const id: number = ctx.request.body.id;
  const nickname: string = ctx.request.body.nickname;
  const password: string = ctx.request.body.password || '';

  if (id <= 10000000 || id >= 100000000) {
    throw SoftError.create(ctx, '用户名必须为8位学号');
  }

  if (!/^[a-zA-Z0-9_]{8,16}$/.test(password)) {
    throw SoftError.create(ctx, '密码必须为8到16位数字、字母、下划线');
  }

  if (!/^.{2,20}$/.test(nickname)) {
    throw SoftError.create(ctx, '昵称必须为 2~20 位');
  }

  const user = await retrieveOneUserById(id);

  if (user) {
    throw SoftError.create(ctx, '改用户已注册');
  }

  await createOneUser({
    studentId: id,
    nickname: nickname,
    password: md5(password),
  });

  ctx.body = '新用户注册成功';
  return next();
}