const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');
const { Employee } = require('./employee.model');

const CashRegister = sequelize.define('CashRegister', {
    cashRegisterId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'employeeId'
        }
    },
    openingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    closingDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    openingBalance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    closingBalance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('ABIERTA', 'CERRADA'),
        allowNull: false,
        defaultValue: 'ABIERTA'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = { CashRegister };