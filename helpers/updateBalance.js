// helpers/updateBalances.js
const Account = require('../models/Account');

const updateBalances = async (from_acct_no, to_acct_no, amount, type) => {
  console.log('📦 updateBalance called with:', { from_acct_no, to_acct_no, amount, type });

  const sender = from_acct_no ? await Account.findOne({ where: { accountNumber: from_acct_no } }) : null;
  const receiver = to_acct_no ? await Account.findOne({ where: { accountNumber: to_acct_no } }) : null;

  amount = parseFloat(amount);

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

  return {
    senderBalance: sender?.balance,
    receiverBalance: receiver?.balance
  };
};

module.exports = updateBalances;