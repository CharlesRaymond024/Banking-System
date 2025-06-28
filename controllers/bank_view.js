const Bank = require('../models/Bank');
const { Op } = require('sequelize');


exports.getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.findAll();
        res.status(200).json(banks);
    } catch (error) {
        console.error('Error fetching banks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getBankById = async (req, res) => {
    const { id } = req.params;
    try {
        const bank = await Bank.findByPk(id);
        if (!bank) {
            return res.status(404).json({ error: 'Bank not found' });
        }
        res.status(200).json(bank);
    } catch (error) {
        console.error('Error fetching bank:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createBank = async (req, res) => {
    const { name, description, logo, email, phone, address } = req.body;
    // Validate required fields
    // Check if bank with same name or email exists
    const existingBank = await Bank.findOne({
      where: {
        [Op.or]: [{ name }, { email }]
      }
    });

    if (existingBank) {
      return res.status(400).json({ message: 'Bank with this name or email already exists' });
    }
    try {
        const newBank = await Bank.create({
            name,
            description,
            logo,
            email,
            phone,
            address
        });
        res.status(201).json(newBank);
    } catch (error) {
        console.error('Error creating bank:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateBank = async (req, res) => {
    const { id } = req.params;
    const { name, description, logo, email, phone, address } = req.body;
    try {
        const bank = await Bank.findByPk(id);
        if (!bank) {
            return res.status(404).json({ error: 'Bank not found' });
        }
        bank.name = name || bank.name;
        bank.description = description || bank.description;
        bank.logo = logo || bank.logo;
        bank.email = email || bank.email;
        bank.phone = phone || bank.phone;
        bank.address = address || bank.address;

        await bank.save();
        res.status(200).json(bank);
    } catch (error) {
        console.error('Error updating bank:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteBank = async (req, res) => {
    const { id } = req.params;
    try {
        const bank = await Bank.findByPk(id);
        if (!bank) {
            return res.status(404).json({ error: 'Bank not found' });
        }
        await bank.destroy();
        res.status(204).json({message: 'Bank deleted successfully'});
    } catch (error) {
        console.error('Error deleting bank:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}