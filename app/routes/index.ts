import * as Router from 'koa-router';
import user from './user';
import book from './book';
import trade from './trade';
import message from './message';

const router = new Router();

/**
 * Base route, return a 401
 */
router.all('/user', user);
router.all('/book', book);
router.all('/trade', trade);
router.all('/message', message);
/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

export const routes = router.routes();
