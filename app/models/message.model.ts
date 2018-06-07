import { query } from '../database';
import { camelcaseAll } from '../util';

export interface MessageBase {
  sessionId: number;
  senderId: number;
  recieverId: number;
  content: string;
  time?: Date;
}

export interface Message extends MessageBase {
  messageId: number;
}

export function createOneMessage(msg: MessageBase): Promise<void> {
  return query('insert into messages (session_id, sender_id, reciever_id, content) values (?, ?, ?, ?)', [msg.sessionId, msg.senderId, msg.recieverId, msg.content]);
}

export function getSessionMessages(id: number): Promise<Message[]> {
  return query('select * from messages where session_id = ?', [id])
    .then(result => (result || []).map((msg: any) => camelcaseAll(msg)));
}


export async function lastMessages(id: number) {
  return query('select session_id, sender_id, reciever_id, content, MAX(time) from messages where (sender_id = ? or reciever_id = ?) group by session_id', [id, id])
    .then(result => (result || []).map((msg: any) => camelcaseAll(msg)));
}
