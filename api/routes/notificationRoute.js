const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification_view');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyRoles = require('../middlewares/verifyRoles');
const roleList = require('../helpers/roleList');

// Route to get all notifications
router.route('/get')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin), NotificationController.getAllNotifications);

// route to get by id
router.route('/get/:id')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), NotificationController.getNotificationById);

// Route to get notifications for a specific user
router.route('/get-by-user/:user_id')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), NotificationController.getUserNotifications);

// Route to mark a notification as read
router.route('/mark-as-read/:id')
  .put(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), NotificationController.markAsRead);

// Route to get unread notifications
router.route('/unread/all')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), NotificationController.getUnreadNotifications);

// Route to mark notifications as unread
router.route('/mark-as-unread/:id')
  .put(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), NotificationController.markAsUnread);

// Route to mark all notifications as read for a user
router.route('/mark-all-as-read/:user_id')
  .put(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin, roleList.User, roleList.Admin), NotificationController.markAllAsRead);
// Route to delete a specific notification
router.route('/delete/:id')
  .delete(authenticateToken, verifyRoles(roleList.SuperAdmin), NotificationController.deleteNotification);

// Export the router
module.exports = router;