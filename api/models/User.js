const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validate that the value is a valid email format
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100], // Password must be between 6 and 100 characters
        },
    },
    roles: {
        type: DataTypes.ENUM('User', 'Admin', 'SuperAdmin', 'CustomerCare'),
        defaultValue: 'User',
    },

    bank: {
        type: DataTypes.INTEGER,
        references: {
            model: 'banks', // Name of the Table
            key: 'id'
        },
        allowNull: true
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
    tableName: 'users', // Specify the table name
});



module.exports = User;