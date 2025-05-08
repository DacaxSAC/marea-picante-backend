const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const Client = sequelize.define('Client', {
    clientId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surnames: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = { Client };
 