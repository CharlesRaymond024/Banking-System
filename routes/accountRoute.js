const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account_view');

// Route to get all accounts
router.get('/get', accountController.getAllAccounts);
// Route to get an account by ID
router.get('/get/:id', accountController.getAccountById);
// Route to create a new account
router.post('/create', accountController.createAccount);
// Route to update an account by ID
router.put('/:id/update', accountController.updateAccount);

// Route to delete an account by ID
router.delete('/:id/delete', accountController.deleteAccount);
// Route to get all active accounts
router.get('/get-isActive', accountController.getActiveAccounts);
// Route to get all suspended accounts
router.get('/get-isSuspended', accountController.getSuspendedAccounts);
// Route to get accounts by user ID
router.get('/get-by-user/:user_id', accountController.getAccountsByUser);

module.exports = router;