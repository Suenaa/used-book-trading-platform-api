import { retrieveOneDetail, retrieveAllBooks, deleteOneBook, addOnebook, BookMeta } from '../models/book.model';
import { Context } from 'koa';
import { SoftError } from '../error';

export async function createOneBook(ctx: Context, next: () => Promise<any>) {
  const book: BookMeta = ctx.body;
  const result = await addOnebook(book);

  if (!result) {
    throw SoftError.create(ctx, '创建失败');
  }
  ctx.body = '创建成功';
  return next();
}

export async function deleteBook(ctx: Context, next: () => Promise<any>) {
  const id: number = ctx.params.id;
  const result = await deleteOneBook(id);
  if (!result) {
    throw SoftError.create(ctx, '无法删除书籍');
  }
  return next();
}

export async function getAllBooks(ctx: Context, next: () => Promise<any>) {
  const result = await retrieveAllBooks();
  ctx.body = result;
  return next();
}

export async function getOneBook(ctx: Context, next: () => Promise<any>) {
  const id = ctx.params.id;
  const result = await retrieveOneDetail(id);

  if (!result) {
    throw SoftError.create(ctx, '找不到出售书籍');
  }

  ctx.body = result;
  return next();
}