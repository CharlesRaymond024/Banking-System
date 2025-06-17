const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccount_view');

// Route to get all user accounts
router.get('/get', userAccountController.getAllUserAccounts);
// Route to get a user account by ID
router.get('/get/:id', userAccountController.getUserAccountById);
// Route to create a new user account
router.post('/create', userAccountController.createUserAccount);
// Route to update a user account by ID
router.put('/:id/update', userAccountController.updateUserAccount);
// Route to delete a user account by ID
router.delete('/:id/delete', userAccountController.deleteUserAccount);
// Route to get all active user accounts
router.get('/get-isActive', userAccountController.getActiveUserAccounts);
// Route to get all suspended user accounts
router.get('/get-isSuspended', userAccountController.getSuspendedUserAccounts);
// Route to get userAccounts by account ID
router.get('/get-by-account/:account_id', userAccountController.getUserAccountsByAccount);
// get user accounts by role
router.get('/get-by-role/:role', userAccountController.getUserAccountsByRole);
// Route to get user accounts by user ID
router.get('/get-by-user/:user_id', userAccountController.getUserAccountsByUser);

module.exports = router;