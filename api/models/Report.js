const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');


const Report = sequelize.define('Report', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },

    bank: {
        type: DataTypes.INTEGER,
        references: {
            model: 'banks',
            key: 'id'
        }
    },

    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'resolved', 'rejected'),
        defaultValue: 'pending'
    },

    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

},{
    timestamps: true,
    tableName: 'reports'
})

module.exports = Report;




