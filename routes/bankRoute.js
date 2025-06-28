const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank_view');
const authenticateToken = require('../middlewares/authenticateToken')
const roleList = require('../helpers/roleList')
const verifyRoles = require('../middlewares/verifyRoles')

// Route to get all banks
router.get('/get', bankController.getAllBanks);
// Route to get a bank by ID
router.get('/get/:id', bankController.getBankById);
router.route('/create')
 .post(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin), bankController.createBank);
router.put('/:id/update', bankController.updateBank);
router.delete('/:id/delete', bankController.deleteBank);

// Export the router
module.exports = router;