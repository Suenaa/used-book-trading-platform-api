import * as Router from 'koa-router';
import { trade, retrieveSelfTrades, sendBook, recieveBook, cancelTrade } from '../controllers/trade.ctrl';

const router = new Router();

router.post('/:bookId', trade);
router.get('/', retrieveSelfTrades);
router.post('/:tid/send', sendBook);
router.delete('/:tid', cancelTrade);
router.post('/:tid/recieve', recieveBook);

export default router.routes();