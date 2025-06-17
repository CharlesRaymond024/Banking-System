const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const UserAccount = sequelize.define('UserAccount', {
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
    account: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id',
        },
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('owner', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    isSuspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
},{ 
    tableName: 'user_accounts',
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

UserAccount.associate = (models) => {
    UserAccount.belongsTo(models.User, {
      foreignKey: 'user',
      as: 'users' // not "users"
    });

    UserAccount.belongsTo(models.Account, {
      foreignKey: 'account',
      as: 'accounts' // not "accounts"
    });
  };

module.exports = UserAccount;