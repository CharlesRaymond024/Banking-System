const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_view');
const authenticateToken = require('../middlewares/authenticateToken');
const roleList = require('../helpers/roleList');
const verifyRoles = require('../middlewares/verifyRoles');

router.route('/get')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin, roleList.CustomerCare), userController.getAllUsers); // Route to get all users
router.route('/get/:id')
 .get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin, roleList.CustomerCare, roleList.User), userController.getUserById); // Route to get a user by ID
router.route('/create')
 .post(authenticateToken, verifyRoles (roleList.User, roleList.CustomerCare, roleList.SuperAdmin), userController.createUser); // Route to create a new user
router.route('/:id/update')
 .put(authenticateToken, verifyRoles (roleList.User, roleList.CustomerCare, roleList.SuperAdmin), userController.updateUser); // Route to update a user by ID
router.route('/:id/delete')
 .delete(authenticateToken, verifyRoles (roleList.SuperAdmin, roleList.CustomerCare), userController.deleteUser); // Route to delete a user by ID

router.route('/isActive')
 .get(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.Admin, roleList.SuperAdmin), userController.getActiveUsers); // Route to get all active users
router.route('/isSuspended')
.get(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.Admin, roleList.SuperAdmin), userController.getSuspendedUsers); // Route to get all suspended users
router.route('/get-by-role/:role')
.get(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.Admin, roleList.SuperAdmin), userController.getUsersByRole); // Route to get users by role
router.route('/get-by-bank/:bank_id')
.get(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.Admin, roleList.SuperAdmin), userController.getUsersByBank); // Route to get users by bank ID

// Export the router
module.exports = router;