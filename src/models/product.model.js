const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { Product };
