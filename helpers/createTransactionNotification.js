const Notification = require('../models/Notification');

const createTransactionNotification = async ({ user, type, decription, amount, balance }) => {
  const message = type === 'debit'
    ? `₦${amount} has been debited from your account.`
    : `₦${amount} has been credited to your account.`;

  return await Notification.create({
    user,
    message,
    type,
    description: decription || message,
    amount,
    balance
  });
};

module.exports = createTransactionNotification;