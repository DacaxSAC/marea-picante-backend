const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const User = sequelize.define('User', {     
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },  
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [5, 255]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 1024]
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Roles',
            key: 'roleId'
        }
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    }
}, {
    timestamps: true
});

module.exports = User;
