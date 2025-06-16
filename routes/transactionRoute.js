const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction_view');

// Route to get all transactions
router.get('/get', transactionController.getAllTransactions);
// Route to get a transaction by ID
router.get('/get/:id', transactionController.getTransactionById);
// Route to get transactions by account ID
router.get('/get/account/:account_id', transactionController.getTransactionsByAccount);
// Route to get transactions by user ID
router.get('/get/user/:user_id', transactionController.getTransactionsByUser);
// Route to get transactions by type
router.get('/get/type/:type', transactionController.getTransactionsByType);
// Route to get transactions by status
router.get('/get/status/:status', transactionController.getTransactionsByStatus);
// Route to get transactions by date range
router.get('/get/date', transactionController.getTransactionsByDateRange);
// route to create a new transaction
router.post('/create', transactionController.createTransaction);
// Route to update a transaction by ID
router.put('/update/:id', transactionController.updateTransaction);
// Route to delete a transaction by ID
router.delete('/delete/:id', transactionController.deleteTransaction);

module.exports = router;