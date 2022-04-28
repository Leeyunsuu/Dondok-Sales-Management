import { MysqlError } from 'mysql';
import { mysqlConnection } from '../config/mysql';
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);
mysqlConnection.open(config);

interface result {
  id: number;
  userid: string;
  username: string;
  psword: string;
  email: string;
}

export class UserStorage {
  static GetUsers(): Promise<result[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user;';
      con.query(sql, (err: MysqlError | null, rows: result[]) => {
        if (err) {
          reject(err);
        } else resolve(rows);
      });
    });
  }

  static GetUserInfo(id: string): Promise<result> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE userid = ?;';
      con.query(sql, [id], (err: MysqlError | null, rows: result[]) => {
        if (err) {
          reject(err);
        } else resolve(rows[0]);
      });
    });
  }

  static SaveUserInfo(
    userid: string,
    psword: string,
    email: string
  ): Promise<{}> {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO user(userid, username, psword, email) VALUES (?,?,?,?);';
      const userinfo = [userid, userid, psword, email];
      con.query(sql, userinfo, (err: MysqlError | null) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}
