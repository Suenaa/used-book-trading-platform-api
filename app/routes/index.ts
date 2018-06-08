import * as Router from 'koa-router';
import user from './user';
import book from './book';
import trade from './trade';
import message from './message';

export const router = new Router();

/**
 * Base route, return a 401
 */
router.use('/api/user', user);
router.use('/api/book', book);
router.use('/api/trade', trade);
router.use('/api/message', message);
/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

