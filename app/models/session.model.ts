import { query } from '../database';

export interface SessionBase {
  buyerId: number;
  sellerId: number;
}

export interface Session extends SessionBase {
  sessionId: number;
}

export function createOneSession(session: SessionBase) {
  return query('insert into sessions (buyer_id, seller_id) values (?, ?)', [session.buyerId, session.sellerId]);
}

export function deleteOneSession(id: number) {
  return query('delete from sessions where session_id = ?', [id]);
}

export async function querySession(session: SessionBase): Promise<Session> {
  const result = await query('select * from sessions where buyer_id = ? and seller_id = ?', [session.sellerId, session.sellerId]);
  if (result && result.length) {
    return result[0];
  }
  return;
}

export async function querySessionById(id: number) {
  const result = await query('select * from sessions where session_id = ?', [id]);
  if (result && result.length) {
    return result[0];
  } else {
    return;
  }
}
