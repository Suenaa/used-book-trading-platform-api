import { query } from '../database';
import { camelcaseAll } from '../util';

export interface UserBase {
  studentId: number;
  nickname: string;
}

export interface User extends UserBase {
  password: string;
}

export async function retrieveOneUserById(id: number): Promise<User> {
  const result = await query('select user_id, nickname from `users` where `student_id` = ?', [id]);
  return camelcaseAll((<any>result)[0]);
}

export function createOneUser(user: User): Promise<void> {
  return query('insert into users set `student_id` = ?, `password` = ?', [user.studentId, user.studentId]);
}
