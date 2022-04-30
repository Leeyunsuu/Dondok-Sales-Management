//Connect Databases
import { MysqlError } from 'mysql';
import { mysqlConnection } from '../config/mysql';
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);
mysqlConnection.open(config);

export interface Data {
  id: number;
  year: number;
  month: number;
  days: number;
  sales: number;
  userId: number | undefined;
}

export class SalesStorage {
  static GetSales(userid: number): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Sales WHERE userId = ?;';
      con.query(sql, [userid], (err: MysqlError | null, rows: Data[]) => {
        if (err) {
          reject(err);
        } else resolve(rows);
      });
    });
  }

  static GetSalesMonth(
    userid: number | undefined,
    year: number,
    month: number
  ): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM Sales WHERE userId = ? AND year = ? AND month = ?;';
      con.query(
        sql,
        [userid, year, month],
        (err: MysqlError | null, rows: Data[]) => {
          if (err) {
            reject(`${err}`);
          } else resolve(rows);
        }
      );
    });
  }

  static GetSalesDay(
    userid: number | undefined,
    year: number,
    month: number,
    days: number
  ): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM Sales WHERE userId = ? AND year = ? AND month = ? AND days = ?;';
      con.query(
        sql,
        [userid, year, month, days],
        (err: MysqlError | null, rows: Data[]) => {
          if (err) {
            reject(`${err}`);
          } else resolve(rows);
        }
      );
    });
  }

  static SaveSalesInfo(
    userid: number | undefined,
    year: number,
    month: number,
    days: number,
    sales: number
  ): Promise<{}> {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO Sales(year, month, days, sales, userId) VALUES (?,?,?,?,?);';
      const salesinfo = [year, month, days, sales, userid];
      con.query(sql, salesinfo, (err: MysqlError | null) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }

  static UpdateSalesInfo(
    userid: number | undefined,
    sales: number,
    year: number,
    month: number,
    days: number
  ): Promise<{}> {
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE Sales SET sales = ? WHERE userId = ? AND year = ? AND month = ? AND days = ?;';
      const salesinfo = [sales, userid, year, month, days];
      con.query(sql, salesinfo, (err: MysqlError | null) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}
