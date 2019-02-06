const router = require('express').Router();
const documentsController = require('../controllers/documents');

router.get('/list', documentsController.list);
router.get('/document', documentsController.document);
router.get('/positions', documentsController.getPositions);
router.post('/add', documentsController.add);
router.post('/add-positions', documentsController.addPositions);
router.patch('/edit', documentsController.edit);
router.delete('/remove', documentsController.remove);
router.delete('/delete-positions', documentsController.deletePositions);

module.exports = router;
