const router = require('express').Router();
const formulasController = require('../controllers/formulas');

router.get('/list', formulasController.list);
router.post('/add', formulasController.add);
router.patch('/edit', formulasController.edit);
router.delete('/remove', formulasController.remove);

module.exports = router;
