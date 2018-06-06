import * as Router from 'koa-router';
import { trade, retrieveSelfTrades, sendBook } from '../controllers/trade.ctrl';

const router = new Router();

router.post('/:bookId', trade);
router.get('/', retrieveSelfTrades);
router.post('/:bookId/send', sendBook);

export default router.routes();