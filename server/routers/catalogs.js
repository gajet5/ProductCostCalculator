const router = require('express').Router();
const catalogsController = require('../controllers/catalogs');

router.get('/list', catalogsController.list);
router.post('/create', catalogsController.create);
router.patch('/rename', catalogsController.rename);
router.delete('/delete', catalogsController.delete);

module.exports = router;
