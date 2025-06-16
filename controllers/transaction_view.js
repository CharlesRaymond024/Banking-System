const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const User = require('../models/User');
const handleTransactionEffects = require('../helpers/handleTransactionEffect');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: [Account, User] });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
};


exports.getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id, {
            include: [
                {
                    model: Account,
                    attributes: ['accountNumber', 'balance'],
                },
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTransactionsByAccount = async (req, res) => {
    const { account_id } = req.params;
    try {
        const transactions = await Transaction.findAll({
            where: { account: account_id },
            include: [
                {
                    model: Account,
                    attributes: ['accountNumber', 'balance'],
                },
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        if (transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found for this account' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTransactionsByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const transactions = await Transaction.findAll({
            where: { user: user_id },
            include: [
                {
                    model: Account,
                    attributes: ['accountNumber', 'balance'],
                },
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        if (transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found for this user' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTransactionsByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const transactions = await Transaction.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
            include: [
                {
                    model: Account,
                    attributes: ['accountNumber', 'balance'],
                },
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        if (transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found for this date range' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by date range:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createTransaction = async (req, res) => {
  try {
    const {
      account,
      transaction_type,
      amount,
      description,
      from_acct_id,
      to_acct_id,
      user,
      transferPin
    } = req.body;
    // Validate account existence
    const acct = await Account.findByPk(account);
    if (!acct) {
      return res.status(404).json({ message: 'Account not found.' });
    }
    // Validate user existence
    const userRecord = await User.findByPk(user);
    if (!userRecord) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Optional: validate user and PIN
    const hashedPin = await bcrypt.hash(transferPin, 4);

    const transaction = await Transaction.create({
      account,
      transaction_type,
      amount,
      description,
      from_acct_id,
      to_acct_id,
      user,
      transferPin: hashedPin,
    });
    const effects = await handleTransactionEffects({
        from_acct_id,
        to_acct_id,
        transactionType: transaction_type,
        amount
    });

    return res.status(200).json({
      success: true,
      message: 'Transaction completed successfully',
      transaction,
      effects
    });


  } catch (error) {
    console.error('Transaction Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { account, transaction_type, amount, description, from_acct_id, to_acct_id, user_id, transferPin } = req.body;
    try {
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        transaction.account = account || transaction.account;
        transaction.transaction_type = transaction_type || transaction.transaction_type;
        transaction.amount = amount || transaction.amount;
        transaction.description = description || transaction.description;
        transaction.from_acct_id = from_acct_id || transaction.from_acct_id;
        transaction.to_acct_id = to_acct_id || transaction.to_acct_id;
        transaction.user_id = user_id || transaction.user_id;
        if (transferPin) {
            transaction.transferPin = await bcrypt.hash(transferPin, 4); // Hash the pin before updating
        }
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        await transaction.destroy();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTransactionsByType = async (req, res) => {
    const { type } = req.params;
    try {
        const transactions = await Transaction.findAll({
            where: { transaction_type: type },
            include: [
                {
                    model: Account,
                    attributes: ['accountNumber', 'balance'],
                },
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        if (transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found for this type' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTransactionsByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const transactions = await Transaction.findAll({
            where: { status },
            include: [
                {
                    model: Account,
                    attributes: ['accountNumber', 'balance'],
                },
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        if (transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found for this status' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
