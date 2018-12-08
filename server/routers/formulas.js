const router = require('express').Router();
const formulasController = require('../controllers/formulas');

router.get('/list', formulasController.list);
router.post('/add', formulasController.add);

module.exports = router;
