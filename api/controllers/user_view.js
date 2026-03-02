const User = require('../models/User');
const Bank = require('../models/Bank');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Bank,
                attributes: ['name', 'logo'] // Include bank details
            }]
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: [{
                model: Bank,
                attributes: ['name', 'logo'] // Include bank details
            }]
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createUser = async (req, res) => {
    const { firstname, lastname, email, phone, roles, bank, password } = req.body;
    const bankExists = await Bank.findByPk(bank);
    if (!bankExists) {
        return res.status(400).json({ message: 'Bank does not exist' });
    }
    // Check if user with same email exists
    const existingUser = await User.findOne({
        where: {
        [Op.or]: [{ phone }, { email }]
      }
    });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email or phone already exists' });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    try {
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            phone,
            roles,
            bank,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, phone, roles, bank, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.roles = roles || user.roles;
        user.bank = bank || user.bank;

        if (password) {
            user.password = await bcrypt.hash(password, 10); // Hash the new password
        }

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(204).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await User.findAll({
            where: { isActive: true },
            include: [{
                model: Bank,
                attributes: ['name', 'logo'] // Include bank details
            }]
        });
        res.status(200).json(activeUsers);
    } catch (error) {
        console.error('Error fetching active users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getSuspendedUsers = async (req, res) => {
    try {
        const suspendedUsers = await User.findAll({
            where: { isSuspended: true },
            include: [{
                model: Bank,
                attributes: ['name', 'logo'] // Include bank details
            }]
        });
        res.status(200).json(suspendedUsers);
    } catch (error) {
        console.error('Error fetching suspended users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await User.findAll({
            where: { roles: role },
            include: [{
                model: Bank,
                attributes: ['name', 'logo'] // Include bank details
            }]
        });
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found with this role' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUsersByBank = async (req, res) => {
    const { bank_id } = req.params;
    try {
        const users = await User.findAll({
            where: { bank: bank_id },
            include: [{
                model: Bank,
                attributes: ['name', 'logo'] // Include bank details
            }]
        });
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found for this bank' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by bank:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}