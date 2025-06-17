const UserAccount = require('../models/UserAccount');
const { Op } = require('sequelize');
const User = require('../models/User');
const Account = require('../models/Account');


exports.getAllUserAccounts = async (req, res) => {
  try {
    const userAccounts = await UserAccount.findAll({
      include: [
        { model: User, as: 'users', attributes: ['id', 'firstname', 'lastname', 'email'] },
        { model: Account, as: 'accounts', attributes: ['id', 'accountName', 'accountNumber', 'balance'] }
      ]
    });
    res.status(200).json(userAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserAccountById = async (req, res) => {
  try {
    const userAccount = await UserAccount.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id','firstname', 'lastname', 'email'] },
        { model: Account, attributes: ['id', 'accountName', 'account_number', 'balance'] }
      ]
    });
    if (!userAccount) return res.status(404).json({ message: 'User account not found' });
    res.status(200).json(userAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createUserAccount = async (req, res) => {
    const { user, account, role } = req.body;

    try {
        // check if the user exists
        const userExists = await User.findOne({ where: { id: user } });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Check if the account exists
        const accountExists = await Account.findOne({ where: { id: account } });
        if (!accountExists) {
            return res.status(404).json({ message: 'Account not found.' });
        }
        const existingUser = await UserAccount.findOne({
        where: { [Op.or]: [{ id: user }] }
    });
    if (existingUser) {
        return res.status(400).json({ message: 'Card with this number already exists' });
    }

        // Create the user account
        const userAccount = await UserAccount.create({
            user,
            account,
            role,
        });

        res.status(201).json(userAccount);
    } catch (error) {
        console.error('Error creating user account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateUserAccount = async (req, res) => {
    const {user, account, role} = req.body;
    try {
        // Check if the user account exists
        const userAccount = await UserAccount.findByPk(req.params.id);

        if (!userAccount) {
            return res.status(404).json({ message: 'User account not found or inactive.' });
        }

        // Update the user account
        userAccount.user = user || userAccount.user;
        userAccount.account = account || userAccount.account;
        userAccount.role = role || userAccount.role;

        await userAccount.save();

        res.status(200).json(userAccount);
    } catch (error) {
        console.error('Error updating user account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteUserAccount = async (req, res) => {
  try {
    const userAccount = await UserAccount.findByPk(req.params.id);
    if (!userAccount) return res.status(404).json({ message: 'User account not found' });

    await userAccount.destroy();
    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserAccountsByAccount = async (req, res) => {
    const { account_id } = req.params;

    try {
        const userAccounts = await UserAccount.findAll({
            where: {
                account: account_id,
                isActive: true,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Account,
                    attributes: ['id', 'account_number', 'balance'],
                },
            ],
        });

        if (userAccounts.length === 0) {
            return res.status(404).json({ message: 'No active user accounts found for this account.' });
        }

        res.status(200).json(userAccounts);
    } catch (error) {
        console.error('Error fetching user accounts by account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getUserAccountsByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const userAccounts = await UserAccount.findAll({
            where: {
                role,
                isActive: true,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Account,
                    attributes: ['id', 'account_number', 'balance'],
                },
            ],
        });

        if (userAccounts.length === 0) {
            return res.status(404).json({ message: `No active user accounts found with role ${role}.` });
        }

        res.status(200).json(userAccounts);
    } catch (error) {
        console.error('Error fetching user accounts by role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getActiveUserAccounts = async (req, res) => {
    try {
        const activeUserAccounts = await UserAccount.findAll({
            where: {
                isActive: true,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Account,
                    attributes: ['id', 'account_number', 'balance'],
                },
            ],
        });

        if (activeUserAccounts.length === 0) {
            return res.status(404).json({ message: 'No active user accounts found.' });
        }

        res.status(200).json(activeUserAccounts);
    } catch (error) {
        console.error('Error fetching active user accounts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getSuspendedUserAccounts = async (req, res) => {
    try {
        const suspendedUserAccounts = await UserAccount.findAll({
            where: {
                isSuspended: true,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Account,
                    attributes: ['id', 'account_number', 'balance'],
                },
            ],
        });

        if (suspendedUserAccounts.length === 0) {
            return res.status(404).json({ message: 'No suspended user accounts found.' });
        }

        res.status(200).json(suspendedUserAccounts);
    } catch (error) {
        console.error('Error fetching suspended user accounts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getUserAccountsByUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const userAccounts = await UserAccount.findAll({
            where: {
                user: user_id,
                isActive: true,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Account,
                    attributes: ['id', 'account_number', 'balance'],
                },
            ],
        });

        if (userAccounts.length === 0) {
            return res.status(404).json({ message: 'No active user accounts found for this user.' });
        }

        res.status(200).json(userAccounts);
    } catch (error) {
        console.error('Error fetching user accounts by user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}