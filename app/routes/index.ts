import * as Router from 'koa-router';
import user from './user';
import book from './book';
import trade from './trade';
import message from './message';

export const router = new Router();

/**
 * Base route, return a 401
 */
router.use('/user', user);
router.use('/book', book);
router.use('/trade', trade);
router.use('/message', message);
/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

