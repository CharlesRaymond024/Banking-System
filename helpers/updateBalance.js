// helpers/updateBalances.js
const Account = require('../models/Account');

const updateBalances = async (senderId, receiverId, amount, type) => {
  const sender = await Account.findOne({ where: { user: senderId } });
  const receiver = await Account.findOne({ where: { user: receiverId } });
  // converts amount to number
  amount = parseFloat(amount)

  if (type === 'transfer' && sender && receiver) {
    sender.balance = parseFloat(sender.balance || 0) - amount;
    receiver.balance = parseFloat(receiver.balance || 0) + amount;
    await sender.save();
    await receiver.save();
    return {
      senderBalance: Number(sender.balance.toFixed(2)),
      receiverBalance: Number(receiver.balance.toFixed(2))
    };
  }

  if (type === 'withdrawal' && sender) {
    sender.balance = parseFloat(sender.balance || 0) - amount;
    await sender.save();
    return { senderBalance: Number(sender.balance.toFixed(2)) };
  }

  if (type === 'deposit' && receiver) {
    receiver.balance = parseFloat(receiver.balance || 0) + amount;
    await receiver.save();
    return { receiverBalance: Number(receiver.balance.toFixed(2)) };
  }

  return null;
};

module.exports = updateBalances;
