import * as Router from 'koa-router';
import user from './user';
import book from './book';

const router = new Router();

/**
 * Base route, return a 401
 */
router.all('/user', user);
router.all('/book', book);
/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

export const routes = router.routes();
