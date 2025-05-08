const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');
const { Order } = require('./order.model');
const { Table } = require('./table.model');

const OrderTable = sequelize.define('OrderTable', {
  orderTableId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'orderId'
    }
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Table,
      key: 'tableId'
    }
  },
  assignedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

// Definir relaciones muchos a muchos
Order.belongsToMany(Table, { through: OrderTable, foreignKey: 'orderId' });
Table.belongsToMany(Order, { through: OrderTable, foreignKey: 'tableId' });

module.exports = { OrderTable };