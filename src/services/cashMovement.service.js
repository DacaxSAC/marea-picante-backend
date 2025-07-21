const { CashMovement } = require('../models/cashMovement.model');
const { CashRegister } = require('../models/cashRegister.model');
const { Kardex } = require('../models/kardex.model');
const { Product } = require('../models/product.model');
const sequelize = require('../utils/database.util');

const services = {};

services.createMovement = async (movementData) => {
    const t = await sequelize.transaction();
    
    try {
        const register = await CashRegister.findByPk(movementData.cashRegisterId);
        
        if (!register || register.status === 'CERRADA') {
            throw new Error('La caja no está activa');
        }

        // Crear el movimiento de caja
        const movement = await CashMovement.create(movementData, { transaction: t });

        // Si el movimiento está relacionado con una orden, actualizar el kardex
        if (movementData.orderId) {
            const order = await Order.findByPk(movementData.orderId, {
                include: [{
                    model: OrderDetail,
                    as: 'detalles',
                    include: [{
                        model: Product,
                        as: 'producto'
                    }]
                }],
                transaction: t
            });

            // Registrar en kardex cada producto de la orden
            for (const detail of order.detalles) {
                await Kardex.create({
                    productId: detail.productId,
                    type: 'SALIDA',
                    quantity: detail.quantity,
                    unitPrice: detail.unitPrice,
                    total: detail.subtotal,
                    description: `Venta - Orden #${order.orderId}`,
                    documentType: 'VENTA',
                    documentNumber: order.orderId.toString(),
                    balance: await calculateNewBalance(detail.productId, detail.quantity, 'SALIDA')
                }, { transaction: t });
            }
        }

        await t.commit();
        return movement;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

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

services.getMovementsByDate = async (startDate, endDate) => {
    return await CashMovement.findAll({
        where: {
            date: {
                [Op.between]: [startDate, endDate]
            }
        },
        include: ['CashRegister', 'Order']
    });
};

services.getDailySummary = async (date) => {
    return await CashMovement.findAll({
        where: {
            date: {
                [Op.between]: [
                    new Date(date).setHours(0,0,0,0),
                    new Date(date).setHours(23,59,59,999)
                ]
            }
        },
        attributes: [
            'type',
            'paymentMethod',
            [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        group: ['type', 'paymentMethod']
    });
};

module.exports = { CashMovementService: services };