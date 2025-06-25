const {DataTypes} = require('sequelize')
const sequelize = require('../db/connection')

const JointAccount = sequelize.define('JointAccount',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    accountName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    balance: {
        type: DataTypes.DECIMAL(12,2),
        defaultValue: 0.00,
    },

    status:{
        type: DataTypes.STRING,
        defaultValue: 'active',
    },

    transferPin:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },

    isSuspended: {
        type: DataTypes.STRING,
        defaultValue: false,
    },

},{
    timestamps: true,
    tableName: 'jointAccounts',
})

module.exports = JointAccount