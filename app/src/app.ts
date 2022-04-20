//모듈
import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as morgan from 'morgan';

const app: express.Application = express();

//라우팅
import * as home from './routes/home';

//config
import * as sessionConfig from './config/session';

//앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(morgan('tiny'));
// app.use(morgan('tiny', { stream: logger.stream }));

//Routes
app.use('/', home); //use => Middleware

export default app;
