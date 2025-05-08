const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');
const { Order } = require('./order.model');
const { Product } = require('./product.model');

const OrderDetail = sequelize.define('OrderDetail', {
  orderDetailId: {
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'productId'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

// Define relationships
Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { OrderDetail };