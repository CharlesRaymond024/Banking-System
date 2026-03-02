const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account_view');
const authenticateToken = require('../middlewares/authenticateToken');
const roleList = require('../helpers/roleList');
const verifyRoles = require('../middlewares/verifyRoles');

// Route to get all accounts
router.route('/get')
 .get(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.SuperAdmin, roleList.Admin), accountController.getAllAccounts);
// Route to get an account by ID
router.route('/get/:id')
 .get(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), accountController.getAccountById);
// Route to create a new account
router.route('/create')
.post(authenticateToken, verifyRoles (roleList.User, roleList.CustomerCare, roleList.SuperAdmin, roleList.Admin), accountController.createAccount);
// Route to update an account by ID
router.route('/:id/update')
.put(authenticateToken, verifyRoles (roleList.User, roleList.CustomerCare, roleList.SuperAdmin), accountController.updateAccount);

// Route to delete an account by ID
router.route('/:id/delete')
.delete(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.Admin, roleList.SuperAdmin), accountController.deleteAccount);
// Route to get all active accounts
router.route('/get-isActive')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), accountController.getActiveAccounts);
// Route to get all suspended accounts
router.route('/get-isSuspended')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), accountController.getSuspendedAccounts);
// Route to get accounts by user ID
router.route('/get-by-user/:user_id')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), accountController.getAccountsByUser);

module.exports = router;