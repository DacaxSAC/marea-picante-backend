const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');
const { Product } = require('./product.model');

const Kardex = sequelize.define('Kardex', {
    kardexId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'productId'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    type: {
        type: DataTypes.ENUM('ENTRADA', 'SALIDA'),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documentType: {
        type: DataTypes.ENUM('COMPRA', 'VENTA', 'AJUSTE', 'INICIAL'),
        allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Establecer relaciones
Kardex.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Kardex, { foreignKey: 'productId' });

module.exports = { Kardex };