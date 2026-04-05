const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank_view');
const authenticateToken = require('../middlewares/authenticateToken')
const roleList = require('../helpers/roleList')
const verifyRoles = require('../middlewares/verifyRoles')

// Route to get all banks
router.route('/get')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin, roleList.User, roleList.CustomerCare), bankController.getAllBanks);
// Route to get a bank by ID
router.route('/get/:id')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.getBankById);
router.route('/create')
 .post(authenticateToken, verifyRoles (roleList.SuperAdmin), bankController.createBank);
router.route('/:id/update')
 .put(authenticateToken, verifyRoles (roleList.SuperAdmin), bankController.updateBank);
// Route to delete a bank by ID
router.route('/:id/delete')
 .delete(authenticateToken, verifyRoles (roleList.SuperAdmin), bankController.deleteBank);

router.route('/get/revenue/bank/:bank_id')
.get(authenticateToken, verifyRoles (roleList.SuperAdmin, roleList.Admin), bankController.getBankRevenue)

router.route('/get/banks/revenue')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.getTotalRevenueAllBanks)
 
// Export the router
module.exports = router;