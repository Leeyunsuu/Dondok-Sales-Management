// import * as mysql from 'mysql';
import { createConnection } from 'mysql';
const logger = require('./logger');

interface info {
  host: string;
  user: string;
  password: string;
  database: string;
}

export const mysqlConnection = {
  config: function (): info {
    return {
      host: String(process.env.DB_HOST),
      user: String(process.env.DB_USER),
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_DATABASE),
    };
  },
  init: function (config: info) {
    return createConnection(config);
  },
  open: function (config: info) {
    createConnection(config).connect((err: string) => {
      if (err) {
        logger.error('MySQL 연결 실패 : ', err);
      } else {
        logger.info('MySQL Connected ...');
      }
    });
  },
  close: function (config: info) {
    createConnection(config).end((err) => {
      if (err) {
        logger.error('MySQL 종료 실패 : ', err);
      } else {
        logger.info('MySQL Terminated ...');
      }
    });
  },
};
