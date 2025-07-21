const { CashRegister } = require('../models/cashRegister.model');
const { CashMovement } = require('../models/cashMovement.model');
const { Employee } = require('../models/employee.model');

const services = {};

services.openCashRegister = async (employeeId, openingBalance) => {
    const activeRegister = await CashRegister.findOne({
        where: {
            employeeId,
            status: 'ABIERTA'
        }
    });

    if (activeRegister) {
        throw new Error('El empleado ya tiene una caja abierta');
    }

    return await CashRegister.create({
        employeeId,
        openingBalance,
        status: 'ABIERTA'
    });
};

services.closeCashRegister = async (cashRegisterId, closingBalance) => {
    const register = await CashRegister.findByPk(cashRegisterId);
    
    if (!register || register.status === 'CERRADA') {
        throw new Error('Caja no encontrada o ya está cerrada');
    }

    return await register.update({
        closingBalance,
        closingDate: new Date(),
        status: 'CERRADA'
    });
};

services.getCashRegisterMovements = async (cashRegisterId) => {
    return await CashMovement.findAll({
        where: { cashRegisterId },
        include: ['Order']
    });
};

services.getActiveCashRegister = async (employeeId) => {
    return await CashRegister.findOne({
        where: {
            employeeId,
            status: 'ABIERTA'
        },
        include: [
            {
                model: Employee,
                attributes: ['employeeId', 'names', 'surnames']
            }
        ]
    });
};

module.exports = { CashRegisterService: services };