const JointAccount = require('../models/JointAccount'); // Adjust the path as necessary
const Transaction = require('../models/Transaction'); // Adjust the path as necessary
const Notification = require('../models/Notification'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary
const Account = require('../models/Account'); // Adjust the path as necessary

const initiateJointTransaction = async ({ type, amount, fromAccountId, toAccountId, initiatedBy }) => {
        if (!['deposit', 'withdrawal', 'transfer'].includes(type)) {
            throw new Error('Invalid transaction type');
        }

        if (amount <= 0) {
            throw new Error('Transaction amount must be greater than zero');
        }

        let updatedBalance = null;

        // Handle deposit
        if (type === 'deposit') {
            const account = await JointAccount.findByPk(toAccountId);
        if (!account) throw new Error('Destination account not found');

        account.balance = parseFloat(account.balance) + parseFloat(amount);
        await account.save();

        updatedBalance = account.balance;

        await Transaction.create({
            account: toAccountId,
            transaction_type: type,
            amount,
            from_acct_id: null,
            to_acct_id: toAccountId,
            user: initiatedBy,
            status: 'completed'
        });

   

        await notifyAllJointUsers(toAccountId, `₦${amount} deposit made. New balance: ₦${updatedBalance}`, type);
    }

        // Handle withdrawal
        else if (type === 'withdrawal') {
        const account = await JointAccount.findByPk(fromAccountId);
        if (!account) throw new Error('Source account not found');

        if (parseFloat(account.balance) < parseFloat(amount)) {
            throw new Error('Insufficient balance');
        }

        account.balance = parseFloat(account.balance) - parseFloat(amount);
        await account.save();

        updatedBalance = account.balance;

        await Transaction.create({
            account: fromAccountId, // required
            transaction_type: type,
            amount,
            from_acct_id: fromAccountId,
            to_acct_id: null,
            user: initiatedBy,
            status: 'completed'
        });

        await notifyAllJointUsers(fromAccountId, `₦${amount} withdrawal made. New balance: ₦${updatedBalance}`, type);
    }
  if (type === 'transfer') {
        const fromAccount = await JointAccount.findByPk(fromAccountId);
        if (!fromAccount) throw new Error('Joint account (sender) not found');

        if (parseFloat(fromAccount.balance) < parseFloat(amount)) {
            throw new Error('Insufficient balance in joint account');
        }

        // Try to find toAccount in both JointAccount and Account tables
        let toAccount = await JointAccount.findByPk(toAccountId);
        let isToNormal = false;

        if (!toAccount) {
            toAccount = await Account.findByPk(toAccountId);
            isToNormal = true;
        }

        if (!toAccount) throw new Error('Destination account not found');

        // Update balances
        fromAccount.balance -= parseFloat(amount);
        toAccount.balance = parseFloat(toAccount.balance) + parseFloat(amount);

        await fromAccount.save();
        await toAccount.save();

        // Create transaction
        await Transaction.create({
            account: fromAccountId,
            transaction_type: 'transfer',
            amount,
            from_acct_id: fromAccountId,
            to_acct_id: toAccountId,
            user: initiatedBy,
            status: 'completed'
        });

        // Notify all joint account users
        await notifyAllJointUsers(fromAccountId, `₦${amount} transferred from Joint Account to Account ${toAccountId}`, type);

        // If toAccount is also a joint account, notify its users
        if (!isToNormal) {
            await notifyAllJointUsers(toAccountId, `₦${amount} received from Joint Account ${fromAccountId}`, type);
        }

        return { senderBalance: fromAccount.balance, receiverBalance: toAccount.balance };
    }

  
};

// 🔔 Helper to notify all users in a joint account
async function notifyAllJointUsers(accounts, message, type) {
  const jointAccount = await JointAccount.findByPk(accounts, {
    include: ['Users'] // Make sure association is defined
  });

  const users = jointAccount?.Users || [];

  await Promise.all(
    users.map(user =>
      Notification.create({
        user: user.id,
        account: accounts,
        type,
        description: message
      })
    )
  );
}

module.exports = initiateJointTransaction;