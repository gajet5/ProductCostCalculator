const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/info', userController.info);

module.exports = router;
