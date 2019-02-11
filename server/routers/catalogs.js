const router = require('express').Router();
const catalogsController = require('../controllers/catalogs');

router.get('/list', catalogsController.list);
router.post('/add', catalogsController.add);
router.patch('/edit', catalogsController.edit);
router.delete('/remove', catalogsController.remove);

module.exports = router;
