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

  delete user.password;

  ctx.session.user = user;

  ctx.body = user;

  return next();
}

export async function isLogin(ctx: Context, next: () => Promise<any>) {
  const user = ctx.session.user;

  if (!user) {
    throw SoftError.create(ctx, '您还未登陆', 401);
  }

  ctx.body = user;
}

export async function register(ctx: Context, next: () => Promise<any>) {
  const id: number = ctx.request.body.username;
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
    throw SoftError.create(ctx, '该用户已注册');
  }

  await createOneUser({
    studentId: id,
    nickname: nickname,
    password: md5(password),
  });

  ctx.body = {
    studentId: id,
    nickname: nickname,
  };

  return next();
}