import { query } from '../database';

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
  return query('insert into messages (session_id, sender_id, recieve_id, content) values (?, ?, ?, ?)', [msg.sessionId, msg.senderId, msg.recieverId, msg.content]);
}

export function getSessionMessages(id: number): Promise<Message[]> {
  return query('select * from messages where session_id = ?', [id]);
}
