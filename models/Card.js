const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const Card = sequelize.define('Card', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account:{
        type: DataTypes.INTEGER,
        references:{
            model: 'accounts',
            key: 'id'
        }
    },
    cardNumber:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    cardType:{
        type: DataTypes.ENUM('debitcard', 'creditcard'),
        allowNull: false,
        defaultValue: 'debitcard'
    },
    status:{
        type: DataTypes.ENUM('working', 'expired'),
        allowNull: false,
        defaultValue: 'working'
    },
    expiryDate:{
        type: DataTypes.STRING,
        allowNull: false
    },

    cvv: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isSuspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

   pin: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{  timestamps: true, // Automatically adds createdAt and updatedAt fields
  tableName: 'cards' // Specify the table name if different from the model name
});

module.exports = Card