const Account = require('../models/Account');

const getUserBalance = async (accountNumber) => {
  const account = await Account.findOne({ where: { accountNumber } });
  if (!account) return { balance: null, account: null };

  const rawBalance = parseFloat(account.balance);
  const balance = Number(rawBalance.toFixed(2));
  return {
    balance,
    account
  };
};

module.exports = getUserBalance;