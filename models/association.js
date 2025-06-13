const Bank = require('./Bank');
const User = require('./User');
const Account = require('./Account');
const Card = require('./Card')

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

Account.hasMany(Card, { foreignKey: 'account' });
Card.belongsTo(Account, { foreignKey: 'account' });

// Export the models
module.exports = {
    Bank,
    User,
    Account,
    Card,
};