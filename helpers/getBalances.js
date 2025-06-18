// helpers/getUserBalance.js
const Account = require('../models/Account');

const getUserBalance = async (user_id) => {
  const account = await Account.findOne({ where: { user: user_id } });
  if (!account) return {balance: null, account: null};

  const rawBalance = parseFloat(account.balance);
  const balance = Number(rawBalance.toFixed(2));
  return {
    balance,
    account
    };
};

module.exports = getUserBalance
