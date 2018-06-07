import { query } from '../database';
import { camelcaseAll } from '../util';

export interface UserBase {
  studentId: number;
  nickname: string;
}

export interface User extends UserBase {
  password: string;
}

export async function retrieveOneUserById(id: number): Promise<UserBase> {
  const result = await query('select student_id, nickname from `users` where `student_id` = ?', [id]);
  return camelcaseAll((<any>result)[0]);
}

export async function retrieveOneUserWithPwd(id: number): Promise<User> {
  const result = await query('select * from `users` where `student_id` = ?', [id]);
  return camelcaseAll((<any>result)[0]);
}

export function createOneUser(user: User): Promise<void> {
  return query('insert into users set `student_id` = ?, `nickname` = ?, `password` = ?', [user.studentId, user.nickname, user.studentId]);
}
