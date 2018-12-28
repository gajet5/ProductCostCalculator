const router = require('express').Router();
const codeGeneratorController = require('../controllers/codeGenerator');

router.get('/', codeGeneratorController);

module.exports = router;
