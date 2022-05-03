//모듈
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { stream } from './config/logger';

const app: express.Application = express();

//라우팅
import { router } from './routes/home';

//config
import { sessionModule } from './config/session';

//앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionModule);
app.use(morgan('tiny', { stream }));

//Routes
app.use('/', router); //use => Middleware

export default app;
