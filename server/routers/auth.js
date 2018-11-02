const router = require('express').Router();
const authController = require('../controllers/auth');

const registrationPolicy = require('../policy/registration');

router.get('/emailExist', authController.emailExist);
router.post('/registration',
    registrationPolicy,
    authController.registration
);
router.post('/login', authController.login);
router.patch('/confirm', authController.confirm);

module.exports = router;
