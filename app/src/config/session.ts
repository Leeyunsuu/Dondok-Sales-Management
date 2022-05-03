// const mysqlConnection = require('./mysql');
// const session = require('express-session');
import { mysqlConnection } from './mysql';
import * as expressSession from 'express-session';
import Session from 'express-session';
import expressMySQLSession from 'express-mysql-session';

const store = expressMySQLSession(expressSession);
//mysql
const mysqlConfig = mysqlConnection.config();
console.log(mysqlConnection.init(mysqlConfig));

//SessionStore setting
const sessionStore = new store(mysqlConfig);

export const sessionModule = Session({
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    // secure: true,
    maxAge: 1000000,
  },
});
