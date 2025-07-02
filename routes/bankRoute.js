const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank_view');
const authenticateToken = require('../middlewares/authenticateToken')
const roleList = require('../helpers/roleList')
const verifyRoles = require('../middlewares/verifyRoles')

// Route to get all banks
router.route('/get')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.getAllBanks);
// Route to get a bank by ID
router.route('/get/:id')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.getBankById);
router.route('/create')
 .post(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.createBank);
router.route('/:id/update')
 .put(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.updateBank);
// Route to delete a bank by ID
router.route('/:id/delete')
 .delete(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.deleteBank);


// Export the router
module.exports = router;