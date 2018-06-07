import * as Router from 'koa-router';
import { trade, retrieveSelfTrades, sendBook, recieveBook } from '../controllers/trade.ctrl';

const router = new Router();

router.post('/:bookId', trade);
router.get('/', retrieveSelfTrades);
router.post('/:tid/send', sendBook);
router.post('/:tid/recieve', recieveBook);

export default router.routes();