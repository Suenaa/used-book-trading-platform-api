import * as Router from 'koa-router';
import auth from '../auth';
import { login, register, isLogin } from '../controllers/user.ctrl';

const router = new Router();

router.post('/login', login);
router.get('/login', auth, isLogin);
router.post('/register', register);

export default router.routes();