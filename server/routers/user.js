const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/info', userController.info);
router.get('/re-confirm-email', userController.reConfirmEmail);
router.patch('/change-password', userController.changePassword);
router.post('/enable-premium', userController.enablePremium);

module.exports = router;
