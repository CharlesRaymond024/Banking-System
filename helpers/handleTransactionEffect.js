const createTransactionNotification = require('./createNotifications');
const updateBalance = require('./updateBalance');

const handleTransactionEffect = async ({ senderId, receiverId, type, amount }) => {
  const notifications = [];

  const balances = await updateBalance(senderId, receiverId, amount, type);

  if (type === 'transfer') {
    const debitMsg = `₦${amount} has been debited from your account.`;
    const creditMsg = `₦${amount} has been credited to your account.`;

    notifications.push(await createTransactionNotification(senderId, debitMsg, 'debit'));
    notifications.push(await createTransactionNotification(receiverId, creditMsg, 'credit'));
  }

  if (type === 'deposit') {
    const msg = `₦${amount} has been deposited to your account.`;
    notifications.push(await createTransactionNotification(receiverId, msg, 'credit'));
  }

  if (type === 'withdrawal') {
    const msg = `₦${amount} has been withdrawn from your account.`;
    notifications.push(await createTransactionNotification(senderId, msg, 'debit'));
  }

  return {
    notifications,
    balances
  };
};

module.exports = handleTransactionEffect;
