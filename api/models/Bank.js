const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const Bank = sequelize.define('Bank',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true, // Validate that the value is a valid email format
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
     isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Default value for isActive
    },
    isSuspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default value for isSuspended
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    tableName: 'banks', // Specify the table name
})

module.exports = Bank