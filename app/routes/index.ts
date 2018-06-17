import * as Router from 'koa-router';
import user from './user';
import book from './book';
import trade from './trade';
import message from './message';

import auth from '../auth';

export const router = new Router();

/**
 * Base route, return a 401
 */
router.use('/api/user', user);
router.use('/api/book', auth, book);
router.use('/api/trade', auth, trade);
router.use('/api/message', auth, message);
/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

