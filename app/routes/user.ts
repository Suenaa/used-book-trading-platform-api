import * as Router from 'koa-router';
import { login, register } from '../controllers/user.ctrl';

const router = new Router({
  prefix: 'api'
});

router.post('/login', login);
router.post('/register', register);

export default router.routes();