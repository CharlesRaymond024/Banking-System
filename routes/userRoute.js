const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_view');

router.get('/get', userController.getAllUsers); // Route to get all users
router.get('/get/:id', userController.getUserById); // Route to get a user by ID
router.post('/create', userController.createUser); // Route to create a new user
router.put('/:id/update', userController.updateUser); // Route to update a user by ID
router.delete('/:id/delete', userController.deleteUser); // Route to delete a user by ID
router.get('/get-isActive', userController.getActiveUsers); // Route to get all active users
router.get('/get-isSuspended', userController.getSuspendedUsers); // Route to get all suspended users
router.get('/get-by-role/:role', userController.getUsersByRole); // Route to get users by role
router.get('/get-by-bank/:bank_id', userController.getUsersByBank); // Route to get users by bank ID

// Export the router
module.exports = router;