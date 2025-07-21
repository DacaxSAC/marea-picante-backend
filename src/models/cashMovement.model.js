const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');
const { CashRegister } = require('./cashRegister.model');
const { Order } = require('./order.model');
const { Employee } = require('./employee.model');

const CashMovement = sequelize.define('CashMovement', {
    cashMovementId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cashRegisterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CashRegister,
            key: 'cashRegisterId'
        }
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Order,
            key: 'orderId'
        }
    },
    type: {
        type: DataTypes.ENUM('INGRESO', 'EGRESO'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Establecer relaciones
CashRegister.belongsTo(Employee, { foreignKey: 'employeeId' });
Employee.hasMany(CashRegister, { foreignKey: 'employeeId' });

CashMovement.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
CashRegister.hasMany(CashMovement, { foreignKey: 'cashRegisterId' });

CashMovement.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(CashMovement, { foreignKey: 'orderId' });

module.exports = { CashMovement };