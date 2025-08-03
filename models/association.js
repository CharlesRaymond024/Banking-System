const Bank = require('./Bank');
const User = require('./User');
const Account = require('./Account');
const Card = require('./Card')
const Transaction = require('./Transaction');
const Notification = require('./Notification');
const JointAccount = require('./JointAccount')
const UserJointAccount = require('./UserJointAccount')


// Define the association between User and Bank
User.belongsTo(Bank, {
    foreignKey: 'bank', // Foreign key in User table
});
Bank.hasMany(User, {
    foreignKey: 'bank', // Foreign key in User table
});

// Define the association between User and Account
User.hasMany(Account, {
    foreignKey: 'user', // Foreign key in Account table
});
Account.belongsTo(User, {
    foreignKey: 'user', // Foreign key in Account table
});

// Define the association between Account and Card

Account.hasMany(Card, { foreignKey: 'account' });
Card.belongsTo(Account, { foreignKey: 'account' });

// Define the association between transactions and Account
Account.hasMany(Transaction, {
    foreignKey: 'account', // Foreign key in Transaction table
});
Transaction.belongsTo(Account, {
    foreignKey: 'account', // Foreign key in Transaction table
});
// Define the association between transactions and User
User.hasMany(Transaction, {
    foreignKey: 'user', // Foreign key in Transaction table
});
Transaction.belongsTo(User, {
    foreignKey: 'user', // Foreign key in Transaction table
});

// Optional: if you want to set associations
Account.hasMany(Transaction, {
  foreignKey: 'account',
  sourceKey: 'accountNumber'
});

Transaction.belongsTo(Account, {
  foreignKey: 'account',
  targetKey: 'accountNumber'
});

Notification.associate = (models) => {
  Notification.belongsTo(models.User, {
    foreignKey: 'user',
    as: 'user',
  });
}

User.belongsToMany(JointAccount,{
    through: UserJointAccount,
    foreignKey: 'user'
})

JointAccount.belongsToMany(User,{
    through: UserJointAccount,
    foreignKey: 'jointAccount'
})



// Export the models
module.exports = {
    Bank,
    User,
    Account,
    Card,
    Transaction,
    Notification,
    JointAccount,
    UserJointAccount
};