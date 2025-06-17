const Notification = require('../models/Notification');

const createTransactionNotification = async (user, message, type) => {
  return await Notification.create({
    user,
    description: message,
    type,
  });
};

module.exports = createTransactionNotification;
