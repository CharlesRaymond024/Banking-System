const Bank = require('./Bank');
const User = require('./User');
const Account = require('./Account');
const Card = require('./Card');
const Transaction = require('./Transaction');
const Notification = require('./Notification');
const UserAccount = require('./UserAccount');

const models = {
  Bank,
  User,
  Account,
  Card,
  Transaction,
  Notification,
  UserAccount
};

// Call associate functions on models that have them
if (UserAccount.associate) UserAccount.associate(models);

// Define direct associations
User.belongsTo(Bank, { foreignKey: 'bank' });
Bank.hasMany(User, { foreignKey: 'bank' });

User.hasMany(Account, { foreignKey: 'user' });
Account.belongsTo(User, { foreignKey: 'user' });

Account.hasMany(Card, { foreignKey: 'account' });
Card.belongsTo(Account, { foreignKey: 'account' });

Account.hasMany(Transaction, { foreignKey: 'account' });
Transaction.belongsTo(Account, { foreignKey: 'account' });

User.hasMany(Transaction, { foreignKey: 'user' });
Transaction.belongsTo(User, { foreignKey: 'user' });

Notification.associate = (models) => {
  Notification.belongsTo(models.User, {
    foreignKey: 'user',
    onDelete: 'CASCADE',
  });
}


// Many-to-many via UserAccount
User.belongsToMany(Account, {
  through: UserAccount,
  foreignKey: 'user',
  otherKey: 'account',
  as: 'accounts'
});
Account.belongsToMany(User, {
  through: UserAccount,
  foreignKey: 'account',
  otherKey: 'user',
  as: 'users'
});

module.exports = models;
