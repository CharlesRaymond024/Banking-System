const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  account: {
    type: DataTypes.STRING,
    references: {
      model: 'accounts',
      key: 'accountNumber'
    },
    allowNull: false
  },

  transaction_type: {
    type: DataTypes.ENUM('deposit', 'withdrawal', 'transfer'),
    allowNull: false,
    defaultValue: 'transfer'
  },

  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 255]
    }
  },

  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },

  from_acct_no: {
    type: DataTypes.STRING,
    allowNull: true
  },

  to_acct_no: {
    type: DataTypes.STRING,
    allowNull: true
  },

  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'transactions'
});

module.exports = Transaction;
