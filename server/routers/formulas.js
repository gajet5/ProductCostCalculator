const router = require('express').Router();
const formulasController = require('../controllers/formulas');

router.get('/formula', formulasController.formula);
router.get('/list', formulasController.list);
router.get('/names-list', formulasController.namesList);
router.post('/add', formulasController.add);
router.patch('/edit', formulasController.edit);
router.delete('/remove', formulasController.remove);

module.exports = router;
