const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const User = require('../models/User');
const handleTransactionEffect = require('../helpers/handleTransactionEffect');
const initiateJointTransaction = require('../helpers/initiateJointTransactions');
const updateBalances = require('../helpers/updateBalance');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const JointAccount = require('../models/JointAccount');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: [Account] });
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
                    attributes: ['firstname','lastname', 'email'],
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

exports.createTransferTransaction = async (req, res) => {
  try {
    const { amount, from_acct_id, to_acct_id, user, transferPin } = req.body;

    const senderAccount = await Account.findByPk(from_acct_id);
    const receiverAccount = await Account.findByPk(to_acct_id);
    const userRecord = await User.findByPk(user);

    if (!senderAccount || !receiverAccount || !userRecord) {
      return res.status(404).json({ message: 'Invalid account or user.' });
    }

    // validate transferPin
    const isMatch = await bcrypt.compare(transferPin, senderAccount.transferPin);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid transfer pin.' });
    }
    // check for transferPin
    if (!transferPin) {
      return res.status(400).json({ message: 'Transfer pin is required for transfer transactions.' });
    }
    // check for sufficient balance
    if (parseFloat(senderAccount.balance) < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance for transfer.' });
    }

    const transaction = await Transaction.create({
      account: from_acct_id,
      transaction_type: 'transfer',
      amount,
      description: `Transfer to account ${to_acct_id}`,
      from_acct_id,
      to_acct_id,
      user,
    });

    const updatedBalances = await handleTransactionEffect({
      senderId: from_acct_id,
      receiverId: to_acct_id,
      amount,
      type: 'transfer'
    });

    res.status(200).json({
      success: true,
      message: 'Transfer successful',
      transaction,
      updatedBalances
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


// controllers/depositController.js
exports.createDepositTransaction = async (req, res) => {
  try {
    const { amount, to_acct_id, user } = req.body;

    const receiverAccount = await Account.findByPk(to_acct_id);
    const userRecord = await User.findByPk(user);

    if (!receiverAccount || !userRecord) {
      return res.status(404).json({ message: 'Invalid account or user.' });
    }

    const transaction = await Transaction.create({
      account: to_acct_id,
      transaction_type: 'deposit',
      amount,
      description: 'Account deposit',
      from_acct_id: null,
      to_acct_id,
      user,
      transferPin: null
    });

    const updatedBalances = await handleTransactionEffect({
      senderId: null,
      receiverId: to_acct_id,
      amount,
      type: 'deposit'
    });

    res.status(200).json({
      success: true,
      message: 'Deposit successful',
      transaction,
      updatedBalances
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// controllers/withdrawalController.js
exports.createWithdrawTransaction = async (req, res) => {
  try {
    const { amount, from_acct_id, user } = req.body;

    const senderAccount = await Account.findByPk(from_acct_id);
    const userRecord = await User.findByPk(user);

    if (!senderAccount || !userRecord) {
      return res.status(404).json({ message: 'Invalid account or user.' });
    }

    // validate transferPin
    const isMatch = await bcrypt.compare(req.body.transferPin, senderAccount.transferPin);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid transfer pin.' });
    }
    // check for sufficient balance
    if (parseFloat(senderAccount.balance) < parseFloat(amount)) {
        return res.status(400).json({ message: 'Insufficient balance for withdrawal.' });
    }

    const transaction = await Transaction.create({
      account: from_acct_id,
      transaction_type: 'withdrawal',
      amount,
      description: 'Account withdrawal',
      from_acct_id,
      to_acct_id: null,
      user,
    });

    const updatedBalances = await handleTransactionEffect({
      senderId: from_acct_id,
      receiverId: null,
      amount,
      type: 'withdrawal'
    });

    res.status(200).json({
      success: true,
      message: 'Withdrawal successful',
      transaction,
      updatedBalances
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { account, transaction_type, amount, description, from_acct_id, to_acct_id, user_id } = req.body;
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

exports.createJointTransaction = async (req, res) => {
  try {
        const { type, amount, fromAccountId, toAccountId, initiatedBy } = req.body;

        if (!['deposit', 'withdrawal', 'transfer'].includes(type)) {
            return res.status(400).json({ error: 'Invalid transaction type' });
        }
        const jointAccount = await JointAccount.findByPk(fromAccountId || toAccountId)
        if(!jointAccount){
            return res.status(404).json({error: 'invaild JointAccount/JointAccount exists'}) 
        }
        // Validate that the user is part of the joint account
        const isUserPartOfJointAccount = await jointAccount.hasUser(initiatedBy);
        if (!isUserPartOfJointAccount) {
            return res.status(403).json({ error: 'User is not part of the joint account' });
        }
        // Validate if withdrawal or transfer, check if the user has the correct transfer pin
        if ((type === 'withdrawal' || type === 'transfer') && !req.body.transferPin) {
            return res.status(400).json({ error: 'Transfer pin is required for withdrawal or transfer transactions' });
        }

        const isMatch = await bcrypt.compare(req.body.transferPin, jointAccount.transferPin);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid transfer pin' });
            }

        // check for insufficent balance
        const jointAccountBalance = parseFloat(jointAccount.balance);
        if (type === 'withdrawal' || type === 'transfer') {
            if (jointAccountBalance < parseFloat(amount)) {
                return res.status(400).json({ error: 'Insufficient balance for withdrawal or transfer' });
            }
        }

        const newBalance = await initiateJointTransaction({
            type,             // becomes transaction_type
            amount,
            fromAccountId,
            toAccountId,
            initiatedBy       // becomes user
        });

        res.status(201).json({ message: `${type} successful`, newBalance });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
