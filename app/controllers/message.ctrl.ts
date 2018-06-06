import { SoftError } from '../error';
import { querySession, querySessionById, createOneSession } from '../models/session.model';
import { Context } from 'koa';
import { createOneMessage, getSessionMessages } from '../models/message.model';

/**
 * 有 session 的情况下直接拿到 session 插入 message
 */
export async function sendMessage(ctx: Context, next: () => Promise<any>) {
  const sid: number = ctx.params.sessionId;
  const uid: number = ctx.session.studentId;
  const msg = ctx.body;

  if (!msg) throw SoftError.create(ctx, '消息不能为空');

  const session = await querySessionById(sid);

  if (!session) throw SoftError.create(ctx, '找不到房间');

  let recieverId = 0;

  if (uid === session.buyerId) {
    recieverId = session.sellerId;
  } else if (uid === session.sellerId) {
    recieverId = session.buyerId;
  }

  await createOneMessage({
    recieverId,
    senderId: uid,
    sessionId: session.sessionId,
    content: msg,
  });

  return next();
}

export async function sendMessageTo(ctx: Context, next: () => Promise<any>) {
  const uid: number = ctx.session.studentId;
  const tid: number = ctx.params.tid;
  const role: 'buyer' | 'seller' = ctx.body.role;
  const msg: string = ctx.body.msg;

  if (!msg) throw SoftError.create(ctx, '消息不能为空');

  const query: {
    buyerId: number;
    sellerId: number;
  } = {
    buyerId: 0,
    sellerId: 0,
  };

  if (role === 'buyer') {
    query.buyerId = uid;
    query.sellerId = tid;
  } else if (role === 'seller') {
    query.buyerId = tid;
    query.sellerId = uid;
  } else {
    throw SoftError.create(ctx, '不是指定的角色：role 必须为 "buyer" 或者 "seller"');
  }

  let session = await querySession(query);

  if (!session) {
    await createOneSession(query);
  }

  session = await querySession(query);

  await createOneMessage({
    recieverId: tid,
    senderId: uid,
    sessionId: session.sessionId,
    content: msg,
  });

  return next();
}

export async function retrieveMessages(ctx: Context, next: () => Promise<any>) {
  const session = ctx.params.sessionId;

  const messages = await getSessionMessages(session);

  ctx.body = messages;

  return next();
}

export async function retrieveLastMessages(ctx: Context, next: () => Promise<any>) {
  // TODO: 拿到用户的最新消息
}