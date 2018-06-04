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
  tags: string;
  price: number;
  state: 1 | 2 | 3;
}

export interface Book extends BookMeta {
  bookId: number;
}

export async function retrieveAllBooks(): Promise<BookBase[]> {
  const result = await query('select name, author, publisherId from books', []);
  return (result || []).map((book: any) => camelcaseAll(book));
}

export async function retrieveOneDetail(id: number): Promise<Book> {
  const result = await query('select * from books where `book_id` = ?', [id]);
  return camelcaseAll(result[0]);
}

export function addOnebook(book: BookMeta) {
  return query(
    'insert into books (name, author, publisher_id, description, phone, campus, tags, price) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [book.name, book.author, book.publisherId, book.description, book.phone, book.campus, book.tags, book.price],
  );
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
