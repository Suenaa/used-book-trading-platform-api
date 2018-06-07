import { retrieveOneDetail, retrieveAllBooks, deleteOneBook, addOneBook, BookMeta } from '../models/book.model';
import { Context } from 'koa';
import { SoftError } from '../error';
import * as fs from 'fs';
import * as path from 'path';

const imagesDir = path.resolve(process.cwd(), 'public/images');

export async function createOneBook(ctx: Context, next: () => Promise<any>) {
  const book: BookMeta = ctx.request.body;
  const uid: number = ctx.session.user.studentId;
  book.state = 1;
  book.publisherId = uid;
  const { insertId } = await addOneBook(book);

  const result = await retrieveOneDetail(insertId);

  if (!result) {
    throw SoftError.create(ctx, '创建失败');
  }
  ctx.body = result;
  return next();
}

export async function updateBookImg(ctx: Context, next: () => Promise<any>) {
  const bid = ctx.params.id;
  const file = ctx.request.body.files.file;
  const uid = ctx.session.user.studentId;
  const ext = file.name.split('.').pop();

  if (!['jpeg', 'jpg', 'png'].includes(ext)) {
    throw SoftError.create(ctx, '文件必须为jpeg，jpg 或者 png 格式');
  }

  const book = await retrieveOneDetail(bid);

  if (!book) {
    throw SoftError.create(ctx, '没有这本书（id不正确）', 404);
  }

  if (book.publisherId !== uid) {
    throw SoftError.create(ctx, '不是书的创建者，没有权限', 403);
  }

  const reader = fs.createReadStream(file.path);
  const upStream = fs.createWriteStream(`${imagesDir}/${bid}.${ext}`);
  reader.pipe(upStream);

  ctx.body = '上传成功';
  return next();
}

export async function deleteBook(ctx: Context, next: () => Promise<any>) {
  const id: number = ctx.params.id;
  const result = await deleteOneBook(id);
  if (!result) {
    throw SoftError.create(ctx, '无法删除书籍, 请确认 id 是否正确');
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