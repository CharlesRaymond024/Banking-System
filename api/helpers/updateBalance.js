// helpers/updateBalances.js
const Account = require('../models/Account');

const updateBalances = async (from_acct_no, to_acct_no, amount, type, t) => {
  console.log('📦 updateBalance called with:', { from_acct_no, to_acct_no, amount, type });

  const sender = from_acct_no
    ? await Account.findOne({
        where: { accountNumber: from_acct_no },
        transaction: t, // ✅
      })
    : null;

  const receiver = to_acct_no
    ? await Account.findOne({
        where: { accountNumber: to_acct_no },
        transaction: t, // ✅
      })
    : null;

  amount = parseFloat(amount);

  if (type === 'transfer' && sender && receiver) {
    sender.balance = parseFloat(sender.balance || 0) - amount;
    receiver.balance = parseFloat(receiver.balance || 0) + amount;

    await sender.save({ transaction: t });   // ✅
    await receiver.save({ transaction: t }); // ✅

    return {
      senderBalance: Number(sender.balance.toFixed(2)),
      receiverBalance: Number(receiver.balance.toFixed(2)),
    };
  }

  if (type === 'withdrawal' && sender) {
    sender.balance = parseFloat(sender.balance || 0) - amount;

    await sender.save({ transaction: t }); // ✅

    return { senderBalance: Number(sender.balance.toFixed(2)) };
  }

  if (type === 'deposit' && receiver) {
    receiver.balance = parseFloat(receiver.balance || 0) + amount;

    await receiver.save({ transaction: t }); // ✅

    return { receiverBalance: Number(receiver.balance.toFixed(2)) };
  }

  return {
    senderBalance: sender?.balance,
    receiverBalance: receiver?.balance,
  };
};

module.exports = updateBalances;