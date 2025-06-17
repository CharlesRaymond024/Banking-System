const Notification = require('../models/Notification');
const Account = require('../models/Account');
const getUserBalance = require('../helpers/getBalances');
const User = require('../models/User');


exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUserNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;

    const notifications = await Notification.findAll({
      where: { user: user_id },
      order: [['createdAt', 'DESC']]
    });

    const updatedBalance = await getUserBalance(user_id);
    if (updatedBalance === null) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    res.status(200).json({
      success: true,
      data: {
        notifications,
        updatedBalance
      }
    });

  } catch (err) {
    console.error('Error fetching notifications:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the notification by ID
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    // Delete the notification
    await notification.destroy();

    res.status(200).json({ success: true, message: 'Notification deleted successfully.' });
  } catch (err) {
    console.error('Error deleting notification:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}