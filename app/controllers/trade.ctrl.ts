import { Context } from 'koa';
import { findTrades, createOneTrade, findTradeByBook, findTradeById } from '../models/trade.model';
import { retrieveOneDetail, updateState } from '../models/book.model';
import { SoftError } from '../error';

export async function retrieveSelfTrades(ctx: Context, next: () => Promise<any>) {
  const uid: number = ctx.session.user.studentId;
  const result = await findTrades(uid);

  ctx.body = result;
}

export async function trade(ctx: Context, next: () => Promise<any>) {
  const bid: number = ctx.params.bookId;
  const uid: number = ctx.session.user.studentId;

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

  ctx.body = '购买成功';
}

export async function sendBook(ctx: Context, next: () => Promise<any>) {
  const tid: number = ctx.params.tid;
  const uid: number = ctx.session.user.studentId;

  const trade = await findTradeById(tid);

  if (trade.sellerId !== uid) {
    throw SoftError.create(ctx, '不是该书的商家，不能确认送货');
  }

  const book = await retrieveOneDetail(trade.bookId);

  if (book.state !== 2) {
    throw SoftError.create(ctx, '该书已送达或还未开始交易');
  }

  await updateState(3, trade.bookId);
  ctx.body = '正在送货';
}

export async function recieveBook(ctx: Context, next: () => Promise<any>) {
  const tid: number = ctx.params.tid;
  const uid: number = ctx.session.user.studentId;

  const trade = await findTradeById(tid);

  if (trade.buyerId !== uid) {
    throw SoftError.create(ctx, '不是该书的买家，不能确认收货');
  }

  const book = await retrieveOneDetail(trade.bookId);

  if (book.state !== 3) {
    throw SoftError.create(ctx, '该书还开始送货');
  }

  await updateState(4, trade.bookId);
  ctx.body = '确认收货';
}
