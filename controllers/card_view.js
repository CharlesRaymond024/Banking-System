const Card = require('../models/Card');
const Account = require('../models/Account');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

exports.getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll({
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getCardById = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findByPk(id, {
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const generateCardNumber = () => {
  return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
};

// Helper: Generate 3-digit CVV
const generateCVV = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

exports.createCard = async (req, res) => {
  const { account, cardType, status, expiryDate, pin } = req.body;

  const accountExists = await Account.findByPk(account);
  if (!accountExists) {
    return res.status(400).json({ message: 'Account does not exist' });
  }

  // Generate unique card number
  let cardNumber;
  let cardExists = true;
  while (cardExists) {
        cardNumber = generateCardNumber();
        const existingCard = await Card.findOne({ where: { cardNumber } });
        if (!existingCard) cardExists = false;
    }

  // ensure account has only one card
    const existingCards = await Card.findAll({ where: { account } });
    if (existingCards.length >= 1) {
        return res.status(400).json({ message: 'Account already has a card' });
    }

  const cvv = generateCVV();

  try {
    const hashedPin = await bcrypt.hash(pin, 4);
    const hashedCvv = await bcrypt.hash(cvv, 3);

    const newCard = await Card.create({
      account,
      cardNumber,
      cardType,
      status,
      expiryDate,
      cvv: hashedCvv,
      pin: hashedPin
    });

    res.status(201).json({
      message: 'Card created successfully',
      card: {
        id: newCard.id,
        cardNumber: newCard.cardNumber,
        cardType: newCard.cardType,
        status: newCard.status,
        cvv: cvv, // Return plain CVV for client use    
        expiryDate: newCard.expiryDate,
        account: newCard.account,
      }
    });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.updateCard = async (req, res) => {
    const { id } = req.params;
    const { account, cardNumber, cardType, status, expiryDate, cvv, pin } = req.body;
    try {
        const card = await Card.findByPk(id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        card.account = account || card.account;
        card.cardNumber = cardNumber || card.cardNumber;
        card.cardType = cardType || card.cardType;
        card.status = status || card.status;
        card.expiryDate = expiryDate || card.expiryDate;
        card.cvv = cvv || card.cvv;
        if (pin) {
            card.pin = await bcrypt.hash(pin, 4); // Hash the pin before updating
        }
        // If CVV is provided, hash it before updating
        if (cvv) {
            card.cvv = await bcrypt.hash(cvv, 3); // Hash the CVV before updating
        }
        await card.save();
        res.status(200).json(card);
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findByPk(id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        await card.destroy();
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getCardsByAccount = async (req, res) => {
    const { account_id } = req.params;
    try {
        const cards = await Card.findAll({
            where: { account: account_id },
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        if (cards.length === 0) {
            return res.status(404).json({ error: 'No cards found for this account' });
        }
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards by account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getActiveCards = async (req, res) => {
    try {
        const activeCards = await Card.findAll({
            where: { status: 'working' },
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        res.status(200).json(activeCards);
    } catch (error) {
        console.error('Error fetching active cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getExpiredCards = async (req, res) => {
    try {
        const expiredCards = await Card.findAll({
            where: { status: 'expired' },
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        res.status(200).json(expiredCards);
    } catch (error) {
        console.error('Error fetching expired cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getCardsByType = async (req, res) => {
    const { type } = req.params;
    try {
        const cards = await Card.findAll({
            where: { cardType: type },
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        if (cards.length === 0) {
            return res.status(404).json({ error: 'No cards found with this type' });
        }
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards by type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.suspendCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findByPk(id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        card.isSuspended = true;
        await card.save();
        res.status(200).json({ message: 'Card suspended successfully' });
    } catch (error) {
        console.error('Error suspending card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.activateCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findByPk(id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        card.isSuspended = false;
        await card.save();
        res.status(200).json({ message: 'Card activated successfully' });
    } catch (error) {
        console.error('Error activating card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getSuspendedCards = async (req, res) => {
    try {
        const suspendedCards = await Card.findAll({
            where: { isSuspended: true },
            include: [{
                model: Account,
                attributes: ['accountNumber', 'balance'] // Include account details
            }]
        });
        res.status(200).json(suspendedCards);
    } catch (error) {
        console.error('Error fetching suspended cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


