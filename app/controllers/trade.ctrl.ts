import { Context } from 'koa';
import { findTrades, createOneTrade } from '../models/trade.model';
import { retrieveBooksByPublisher, retrieveOneDetail, updateState } from '../models/book.model';
import { SoftError } from '../error';

export async function retrieveSelfTrades(ctx: Context, next: () => Promise<any>) {
  const uid: number = ctx.session.studentId;
  const result = await findTrades(uid);

  ctx.body = result;

  return next();
}

export async function trade(ctx: Context, next: () => Promise<any>) {
  const bid: number = ctx.params.bookId;
  const uid: number = ctx.session.studentId;

  const book = await retrieveOneDetail(bid);

  if (book.state !== 1) {
    throw SoftError.create(ctx, '该书已经出售');
  }

  if (book.publisherId === uid) {
    throw SoftError.create(ctx, '不能购买自己上架的书籍');
  }

  await createOneTrade({
    buyerId: uid,
    sellerId: book.publisherId,
    bookId: book.bookId,
  });

  await updateState(2, book.bookId);

  return next();
}

export async function sendBook(ctx: Context, next: () => Promise<any>) {
  const bid: number = ctx.params.bookId;
  await updateState(3, bid);
  ctx.body = '正在送货';
  return next();
}
