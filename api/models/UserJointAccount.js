const {DataTypes} = require('sequelize')
const sequelize = require('../db/connection')

const UserJointAccount = sequelize.define('UserJointAccount',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    user: {
        type: DataTypes.INTEGER,
        references:{
            model: 'users',
            key: 'id'
        },
        allowNull: true,
        onDelete: 'CASCADE',
    },

    jointAccount:{
        type: DataTypes.INTEGER,
        references:{
            model: 'jointAccounts',
            key: 'id'
        },
        allowNull: true,
        onDelete: 'CASCADE',
    },

   role: {
    type: DataTypes.STRING,
    defaultValue: 'co-owner'
   }
},{
    timestamps: true,
    tableName: 'userJointAccount',
})

module.exports = UserJointAccount