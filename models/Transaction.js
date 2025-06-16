const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Transaction = sequelize.define('Transaction', {
  id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

  account: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id',
        },
        allowNull: false,
    },

  transaction_type: {
        type: DataTypes.ENUM('deposit', 'withdrawal', 'transfer'),
        allowNull: false,
        defaultValue: 'transfer',
    },

  amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },

  description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255], // Maximum length for description
        },
    },

  status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
    },

  from_acct_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id',
        },
        allowNull: true,
    },

  to_acct_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id',
        },
        allowNull: true,
    },

  user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: false,
    },

  transferPin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
  timestamps: true,
  tableName: 'transactions',
});

module.exports = Transaction;
