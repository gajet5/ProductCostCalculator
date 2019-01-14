const router = require('express').Router();
const documentsController = require('../controllers/documents');

router.get('/list', documentsController.list);
router.get('/positions', documentsController.getPositions);
router.post('/add', documentsController.add);
router.patch('/edit', documentsController.edit);
router.delete('/remove', documentsController.remove);

module.exports = router;
