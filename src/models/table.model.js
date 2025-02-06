const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const Table = sequelize.define('Table', {
  tableId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { Table };
 