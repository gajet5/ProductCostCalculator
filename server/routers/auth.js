const router = require('express').Router();
const authController = require('../controllers/auth');

router.get('/emailExist', authController.emailExist);
router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/confirm', authController.confirm);

module.exports = router;
