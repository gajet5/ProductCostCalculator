const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/info', userController.info);
router.get('/re-confirm-email', userController.reConfirmEmail);
router.patch('/change-password', userController.changePassword);

module.exports = router;
