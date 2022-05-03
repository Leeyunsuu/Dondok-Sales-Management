import * as express from 'express';
import { sessionAuth } from '../middleware/sessionauth';

const router = express.Router();

//Controller
// const ctrl = require('./home.ctrl');
import { output, auth, process } from './home.crtl';

//Rendering Pages
router.get('/', output.home);
router.get('/login', output.login);
router.get('/finder', output.finder);
router.get('/table', output.table);
router.get('/table/:year/:month', process.get.monthInfo);
router.get('/table/:year/:month/:days', process.get.dayInfo);

router.get('/logout', auth.logout);

//POST
router.post('/login', process.post.login);
router.post('/register', process.post.register);
router.post('/finder', process.post.finder);
router.post('/sales', sessionAuth.checkSession, process.post.sales);

//UPDATE
router.put('/sales', sessionAuth.checkSession, process.put.sales);

export { router };
