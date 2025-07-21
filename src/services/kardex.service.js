const { Kardex } = require('../models/kardex.model');
const { Product } = require('../models/product.model');
const sequelize = require('../utils/database.util');
const { Op } = require('sequelize');

const services = {};

// Función auxiliar para calcular el nuevo balance
const calculateNewBalance = async (productId, quantity, type) => {
    const lastKardex = await Kardex.findOne({
        where: { productId },
        order: [['kardexId', 'DESC']]
    });

    const currentBalance = lastKardex ? lastKardex.balance : 0;
    return type === 'ENTRADA' ? 
        currentBalance + quantity : 
        currentBalance - quantity;
};

services.registerPurchase = async (purchaseData) => {
    const t = await sequelize.transaction();
    
    try {
        const { products, documentNumber } = purchaseData;
        
        for (const item of products) {
            // Registrar en kardex
            await Kardex.create({
                productId: item.productId,
                type: 'ENTRADA',
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: item.quantity * item.unitPrice,
                description: `Compra #${documentNumber}`,
                documentType: 'COMPRA',
                documentNumber,
                balance: await calculateNewBalance(item.productId, item.quantity, 'ENTRADA')
            }, { transaction: t });

            // Actualizar stock del producto
            await Product.increment('stock', {
                by: item.quantity,
                where: { productId: item.productId },
                transaction: t
            });
        }

        await t.commit();
        return { success: true, message: 'Compra registrada exitosamente' };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

services.registerAdjustment = async (adjustmentData) => {
    const t = await sequelize.transaction();
    
    try {
        const { productId, quantity, type, reason } = adjustmentData;
        
        await Kardex.create({
            productId,
            type,
            quantity: Math.abs(quantity),
            unitPrice: 0, // Ajuste no afecta el costo
            total: 0,
            description: `Ajuste de inventario: ${reason}`,
            documentType: 'AJUSTE',
            documentNumber: new Date().getTime().toString(),
            balance: await calculateNewBalance(productId, Math.abs(quantity), type)
        }, { transaction: t });

        // Actualizar stock del producto
        const adjustment = type === 'ENTRADA' ? quantity : -quantity;
        await Product.increment('stock', {
            by: adjustment,
            where: { productId },
            transaction: t
        });

        await t.commit();
        return { success: true, message: 'Ajuste registrado exitosamente' };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

// Función que faltaba implementar
services.getProductKardex = async (productId, startDate, endDate) => {
    const whereClause = { productId };
    
    if (startDate && endDate) {
        whereClause.date = {
            [Op.between]: [
                new Date(startDate),
                new Date(endDate)
            ]
        };
    }
    
    const kardexEntries = await Kardex.findAll({
        where: whereClause,
        include: [{
            model: Product,
            attributes: ['productId', 'name', 'description', 'stock']
        }],
        order: [['date', 'ASC']]
    });
    
    // Calcular saldos acumulados si es necesario
    let runningBalance = 0;
    const formattedEntries = kardexEntries.map(entry => {
        const plainEntry = entry.get({ plain: true });
        
        if (entry.type === 'ENTRADA') {
            runningBalance += entry.quantity;
        } else {
            runningBalance -= entry.quantity;
        }
        
        return {
            ...plainEntry,
            runningBalance
        };
    });
    
    return formattedEntries;
};

// Función adicional para obtener resumen de kardex
services.getKardexSummary = async () => {
    const summary = await Product.findAll({
        attributes: [
            'productId', 
            'name', 
            'stock',
            [sequelize.literal('(SELECT SUM(quantity) FROM "Kardexes" WHERE "Kardexes"."productId" = "Product"."productId" AND type = \'ENTRADA\')'), 'totalEntradas'],
            [sequelize.literal('(SELECT SUM(quantity) FROM "Kardexes" WHERE "Kardexes"."productId" = "Product"."productId" AND type = \'SALIDA\')'), 'totalSalidas'],
            [sequelize.literal('(SELECT AVG(unitPrice) FROM "Kardexes" WHERE "Kardexes"."productId" = "Product"."productId" AND type = \'ENTRADA\')'), 'precioPromedio']
        ]
    });
    
    return summary;
};

module.exports = { KardexService: services };