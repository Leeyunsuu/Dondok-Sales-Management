// const mysqlConnection = require('./mysql');
// const session = require('express-session');
import { mysqlConnection } from './mysql';
import * as expressSession from 'express-session';
import * as expressMySQLSession from 'express-mysql-session';

const store = expressMySQLSession(expressSession);
//mysql
const mysqlConfig = mysqlConnection.config();
console.log(mysqlConnection.init(mysqlConfig));

//SessionStore setting
const sessionStore = new store(mysqlConfig);

export const sessionModule = expressSession({
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
});
