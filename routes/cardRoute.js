const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card_view');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyRoles = require('../middlewares/verifyRoles');
const roleList = require('../helpers/roleList');

// Route to get all cards
router.route('/get')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.getAllCards);
// Route to get a card by ID
router.route('/get/:id')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin, roleList.User), cardController.getCardById);
// Route to create a new card
router.route('/create')
 .post(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.createCard);
// Route to update a card by ID
router.route('/:id/update')
 .put(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.updateCard);
// Route to delete a card by ID
router.route('/:id/delete')
 .delete(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.deleteCard);
router.route('/get-by-account/:accountId')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.getCardsByAccount);
// Route to get all active cards
router.route('/get-isActive')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.getActiveCards);
// Route to get all expired cards
router.route('/get-isExpired')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.getExpiredCards);
// Route to get all blocked cards
router.route('/get-isBlocked')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.getSuspendedCards);
// Route to get cards by type
router.route('/get-by-type/:type')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.getCardsByType);

 // Route to suspend a card by ID
router.route('/:id/suspend')
 .put(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.suspendCard);
// Route to activate a card by ID
router.route('/:id/activate')
 .put(authenticateToken, verifyRoles (roleList.Admin, roleList.CustomerCare, roleList.SuperAdmin), cardController.activateCard);
// Export the router
module.exports = router;