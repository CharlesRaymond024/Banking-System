const Account = require('../models/Account');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            include: [{
                model: User,
                attributes: ['firstname', 'lastname', 'email'] // Include user details
            }]
        });
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findByPk(id, {
            include: [{
                model: User,
                attributes: ['firstname', 'lastname', 'email'] // Include user details
            }]
        });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error('Error fetching account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

exports.createAccount = async (req, res) => {
  const { accountName, accountType, user, balance, currency, transferPin } = req.body;

  // ✅ Check if user exists
  const existingUser = await User.findByPk(user);
  if (!existingUser) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  // 🔁 Generate a unique 10-digit account number
  let accountNumber;
  let existingAccount;
  do {
    accountNumber = generateAccountNumber();
    existingAccount = await Account.findOne({ where: { accountNumber } });
  } while (existingAccount);

  const hashedPin = await bcrypt.hash(transferPin, 4);

  try {
    const newAccount = await Account.create({
      accountName,
      accountNumber, // auto-generated
      accountType,
      user,
      balance,
      currency,
      transferPin: hashedPin,
    });

    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.updateAccount = async (req, res) => {
    const { id } = req.params;
    const { accountName, accountNumber, accountType, user, balance, currency, transferPin } = req.body;

    try {
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Update fields
        account.accountName = accountName || account.accountName;
        account.accountNumber = accountNumber || account.accountNumber;
        account.accountType = accountType || account.accountType;
        account.user = user || account.user;
        account.balance = balance !== undefined ? balance : account.balance;
        account.currency = currency || account.currency;
        account.transferPin = transferPin || account.transferPin;
        if (transferPin) {
            account.transferPin = await bcrypt.hash(transferPin, 4); // Hash the new transfer pin
        }

        await account.save();
        res.status(200).json(account);
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        await account.destroy();
        res.status(200).json({message: 'Account deleted successfully'})
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getActiveAccounts = async (req, res) => {
    try {
        const activeAccounts = await Account.findAll({
            where: { isActive: true },
            include: [{
                model: User,
                attributes: ['firstname', 'lastname', 'email'] // Include user details
            }]
        });
        res.status(200).json(activeAccounts);
    } catch (error) {
        console.error('Error fetching active accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getSuspendedAccounts = async (req, res) => {
    try {
        const suspendedAccounts = await Account.findAll({
            where: { isSuspended: true },
            include: [{
                model: User,
                attributes: ['firstname', 'lastname', 'email'] // Include user details
            }]
        });
        res.status(200).json(suspendedAccounts);
    } catch (error) {
        console.error('Error fetching suspended accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAccountsByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const accounts = await Account.findAll({
            where: { user: user_id },
            include: [{
                model: User,
                attributes: ['firstname', 'lastname', 'email'] // Include user details
            }]
        });
        if (accounts.length === 0) {
            return res.status(404).json({ error: 'No accounts found for this user' });
        }
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error fetching accounts by user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}