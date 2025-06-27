const createTransactionNotification = require('./createNotifications');
const Account = require('../models/Account');
const updateBalance = require('./updateBalance');

const handleTransactionEffect = async ({ senderId, receiverId, type, amount }) => {
  const notifications = [];

  const balances = await updateBalance(senderId, receiverId, amount, type);

  if (type === 'transfer') {
    const senderAccount = await Account.findByPk(senderId);
    const receiverAccount = await Account.findByPk(receiverId);
    const senderUserId = senderAccount?.user;
    const receiverUserId = receiverAccount?.user;

    const debitMsg = `₦${amount} has been debited from your account.`;
    const creditMsg = `₦${amount} has been credited to your account.`;

    notifications.push(await createTransactionNotification(senderUserId, debitMsg, 'debit'));
    notifications.push(await createTransactionNotification(receiverUserId, creditMsg, 'credit'));
  }

  if (type === 'deposit') {
    const receiverAccount = await Account.findByPk(receiverId);
    const receiverUserId = receiverAccount?.user;

    const msg = `₦${amount} has been deposited to your account.`;
    notifications.push(await createTransactionNotification(receiverUserId, msg, 'credit'));
  }

  if (type === 'withdrawal') {
    const senderAccount = await Account.findByPk(senderId);
    const senderUserId = senderAccount?.user;

    const msg = `₦${amount} has been withdrawn from your account.`;
    notifications.push(await createTransactionNotification(senderUserId, msg, 'debit'));
  }

  return {
    notifications,
    balances
  };
};

module.exports = handleTransactionEffect;
