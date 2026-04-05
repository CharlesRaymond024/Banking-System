// helpers/createTransactionNotification.js
const Notification = require('../models/Notification');
const User = require('../models/User');

const createTransactionNotification = async (user_id, message, type, t) => {
  console.log('🚨 Notification Helper Called With:', { user_id, message, type });

  const userExists = await User.findByPk(user_id, {
    transaction: t, // ✅
  });

  if (!userExists) {
    console.error(`❌ User with ID ${user_id} does not exist in DB.`);
    throw new Error(`User ${user_id} not found`);
  }

  return await Notification.create(
    {
      user: user_id,
      description: message,
      type,
    },
    {
      transaction: t, // ✅
    }
  );
};

module.exports = createTransactionNotification;