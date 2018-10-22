const router = require('express').Router();
const authController = require('../controllers/auth');

const registrationPolicy = require('../policy/registration');

router.post('/registration',
    registrationPolicy,
    authController.registration
);
router.patch('/confirm', authController.confirm);
router.get('/emailExist', authController.emailExist);

module.exports = router;