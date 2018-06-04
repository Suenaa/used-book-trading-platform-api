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

export function getSessionMessages(id: number): Promise<Message[]> {
  return query('select * from messages where session_id = ?', [id]);
}
