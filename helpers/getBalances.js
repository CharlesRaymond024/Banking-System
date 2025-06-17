// helpers/getUserBalance.js
const Account = require('../models/Account');

const getUserBalance = async (user_id) => {
  const account = await Account.findOne({ where: { user: user_id } });
  if (!account) return null;

  const rawBalance = parseFloat(account.balance);
  return Number(rawBalance.toFixed(2));
};

module.exports = getUserBalance;
