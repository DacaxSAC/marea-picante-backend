const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const Employee = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'Users', // Nombre de la tabla
            key: 'userId'
        }
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

module.exports = { Employee };
 