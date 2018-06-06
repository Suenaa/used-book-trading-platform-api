import * as Router from 'koa-router';
import * as bookCtrl from '../controllers/book.ctrl';

const router = new Router();

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
router.post('/:id/img', bookCtrl.updateBookImg);
router.post('/', bookCtrl.createOneBook);
router.delete('/:id', bookCtrl.deleteBook);

export default router.routes();