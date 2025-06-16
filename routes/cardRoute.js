const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card_view');

// Route to get all cards
router.get('/get', cardController.getAllCards);
// Route to get a card by ID
router.get('/get/:id', cardController.getCardById);
// Route to create a new card
router.post('/create', cardController.createCard);
// Route to update a card by ID
router.put('/:id/update', cardController.updateCard);
// Route to delete a card by ID
router.delete('/:id/delete', cardController.deleteCard);
router.get('/get-by-account/:accountId', cardController.getCardsByAccount);
router.get('/get-working-cards', cardController.getActiveCards);
router.get('/get-expired-cards', cardController.getExpiredCards);
router.get('/get-cards-by-type/:type', cardController.getCardsByType);

// Export the router
module.exports = router;