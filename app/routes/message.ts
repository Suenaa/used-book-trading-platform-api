import * as Router from 'koa-router';
import { retrieveLastMessages, retrieveMessages, sendMessage, sendMessageTo } from '../controllers/message.ctrl';

const router = new Router();

router.get('/last', retrieveLastMessages);
router.get('/:sessionId', retrieveMessages);
router.post('/:sessionId', sendMessage);
router.post('/to/:tid', sendMessageTo);

export default router.routes();