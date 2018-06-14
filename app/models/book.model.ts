import { query } from '../database';
import { camelcaseAll } from '../util';

export interface BookBase {
  name: string;
  author: string;
  publisherId: number;
}

export interface BookMeta extends BookBase {
  description: string;
  phone: number;
  campus: string;
  comment: string;
  price: number;
  state: 1 | 2 | 3 | 4;
}

export interface Book extends BookMeta {
  bookId: number;
}

export async function retrieveAllBooks(): Promise<BookBase[]> {
  const result = await query('select * from books', []);
  return (result || []).map((book: any) => camelcaseAll(book));
}

export async function retrieveOneDetail(id: number): Promise<Book> {
  const result = await query('select * from books where `book_id` = ?', [id]);
  return camelcaseAll(result[0]);
}

export function addOneBook(book: BookMeta) {
  return query(
    'insert into books (name, author, publisher_id, description, phone_num, campus, comment, price) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [book.name, book.author, book.publisherId, book.description, book.phone, book.campus, book.comment, book.price],
  );
}

export function updateState(state: 1 | 2 | 3 | 4, id: number) {
  return query('update books set state = ? where book_id = ?', [state, id]);
}

export function updateImgUrl(img: string, id: number) {
  return query('update books set img = ? where book_id = ?', [img]);
}

export function retrieveBooksByPublisher(id: number): Promise<BookBase[]> {
  return query('select name, author from books where `publisher_id` = ?', [id]);
}

export async function deleteOneBook(id: number) {
  try {
    await query('delete from books where `book_id` = ?', [id]);
    return true;
  } catch (e) {
    return false;
  }
}
