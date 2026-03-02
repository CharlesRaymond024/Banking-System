const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const Notification = sequelize.define('Notification', {
  id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('credit', 'debit', 'deposit', 'withdrawal', 'transfer'),
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set to current date and time
    },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  tableName: 'Notifications', // Specify the table name
});

module.exports = Notification;