const Bank = require('./Bank');
const User = require('./User');

// Define the association between User and Bank
User.belongsTo(Bank, {
    foreignKey: 'bank', // Foreign key in User table
});
Bank.hasMany(User, {
    foreignKey: 'bank', // Foreign key in User table
});

// Export the models
module.exports = {
    Bank,
    User,
};