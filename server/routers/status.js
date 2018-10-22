const router = require('express').Router();
const statusController = require('../controllers/status');

router.get('/', statusController);

module.exports = router;