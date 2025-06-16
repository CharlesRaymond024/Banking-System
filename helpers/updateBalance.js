const Account = require('../models/Account');

const updateBalance = async ({ from_acct_id, to_acct_id, amount }) => {
  const senderAccount = await Account.findOne({ where: { user: from_acct_id } });
  const receiverAccount = await Account.findOne({ where: { user: to_acct_id } });

  if (!senderAccount || !receiverAccount) {
    throw new Error('One or both accounts not found.');
  }

  senderAccount.balance -= amount;
  receiverAccount.balance += amount;

  await senderAccount.save();
  await receiverAccount.save();

  return {
    senderBalance: senderAccount.balance,
    receiverBalance: receiverAccount.balance,
  };
};

module.exports = { updateBalance };
