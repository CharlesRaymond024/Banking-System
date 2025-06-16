const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification_view');

// Route to get all notifications
router.get('/get', NotificationController.getAllNotifications);
// Route to get notifications for a specific user
router.get('/:user_id', NotificationController.getUserNotifications);
// Route to delete a specific notification
router.delete('/delete/:id', NotificationController.deleteNotification);

// Export the router
module.exports = router;