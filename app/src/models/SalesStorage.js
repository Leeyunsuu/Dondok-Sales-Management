'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);

class SalesStorage {
  static GetSalesInfo(userid) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Sales WHERE userId = ?;';
      con.query(sql, [userid], (err, rows) => {
        if (err) {
          reject(err);
        } else resolve(rows[0]);
      });
    });
  }

  static SaveSalesInfo(salesInfo, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO Sales(year, month, days, sales, userId) VALUES (?,?,?,?,?);';
      const salesinfo = [
        salesInfo.sales_Years,
        salesInfo.sales_Month,
        salesInfo.sales_Days,
        salesInfo.sales,
        userId,
      ];
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}

module.exports = SalesStorage;
