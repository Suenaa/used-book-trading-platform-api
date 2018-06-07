import * as mysql from 'mysql';

const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  '12345678',
  database :  'sysu_second_hand_book_trading'
});

export function query(sql: string, values: any) {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
          connection.release();
        });
      }
    });
  });
}