const createNotification = require('./createTransactionNotification');
const {updateBalance} = require('./updateBalance');

const handleTransactionEffects = async ({ transactionType, from_acct_id, to_acct_id, amount }) => {
  if (transactionType === 'transfer') {
    const balances = await updateBalance(from_acct_id, to_acct_id, amount);

    const debitNote = await createNotification({ user: from_acct_id, type: 'debit', amount });
    const creditNote = await createNotification({ user: to_acct_id, type: 'credit', amount });

    return { debitNote, creditNote, balances };
  }

  if (transactionType === 'deposit') {
    const account = await updateBalance(null, from_acct_id, -amount); // Just credit
    const creditNote = await createNotification({ user: from_acct_id, type: 'credit', amount });
    return { creditNote, balance: account.receiverBalance };
  }

  if (transactionType === 'withdrawal') {
    const account = await updateBalance(senderId, null, amount); // Just debit
    const debitNote = await createNotification({ user: from_acct_id, type: 'debit', amount });
    return { debitNote, balance: account.senderBalance };
  }

  return null;
};

module.exports = handleTransactionEffects;
