const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction_view');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyRoles = require('../middlewares/verifyRoles');
const roleList = require('../helpers/roleList');

// Route to get all transactions
router.route('/get')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin), transactionController.getAllTransactions);

// Route to get a transaction by ID
router.route('/get/:id')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionById);
// Route to get transactions by account ID
router.route('/get/account/:account_id')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionsByAccount);

// Route to get transactions by user ID
router.route('/get/user/:user_id')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionsByUser);

// Route to get transactions by type
router.route('/get/type/:type')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionsByType);

// Route to get transactions by status
router.route('/get/status/:status')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionsByStatus);

// Route to get transactions by date range
router.route('/get/date/:startDate/:endDate')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionsByDateRange);

// Route to create a new transaction
router.post('/transfer', transactionController.createTransferTransaction);
router.post('/deposit', transactionController.createDepositTransaction);
router.post('/withdrawal', transactionController.createWithdrawTransaction);
// Route to create a joint transaction
router.post('/joint', transactionController.createJointTransaction);
// Route to update a transaction by ID
router.route('/update/:id')
.put(authenticateToken, verifyRoles (roleList.SuperAdmin), transactionController.updateTransaction);
// Route to delete a transaction by ID
router.route('/delete/:id')
  .delete(authenticateToken, verifyRoles(roleList.SuperAdmin), transactionController.deleteTransaction);
// Route to get transactions by card ID
// router.route('/get/card/:card_id')
    // .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), transactionController.getTransactionsByCard);


module.exports = router;