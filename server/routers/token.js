const router = require('express').Router();
const tokenController = require('../controllers/token');

router.get('/status', tokenController);

module.exports = router;
