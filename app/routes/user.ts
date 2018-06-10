import * as Router from 'koa-router';
import { login, register, isLogin } from '../controllers/user.ctrl';

const router = new Router();

router.post('/login', login);
router.get('/login', isLogin);
router.post('/register', register);

export default router.routes();