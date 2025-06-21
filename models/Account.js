const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');


const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
  accountType: {
    type: DataTypes.ENUM('savings', 'current', 'fixed'),
    allowNull: false,
    defaultValue: 'savings'
  },

  user: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Name of the Table
      key: 'id'
    }
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },

  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USD'
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // Default value for isActive
  },
    isSuspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Default value for isFrozen
    },
},{
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  tableName: 'accounts' // Specify the table name if different from the model name
});

module.exports = Account;
