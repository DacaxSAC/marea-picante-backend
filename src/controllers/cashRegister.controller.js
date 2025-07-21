const { CashRegisterService } = require('../services/cashRegister.service');
const Joi = require('joi');

const controllers = {};

const openRegisterSchema = Joi.object({
    employeeId: Joi.number().integer().required(),
    openingBalance: Joi.number().precision(2).required()
});

const closeRegisterSchema = Joi.object({
    closingBalance: Joi.number().precision(2).required()
});

controllers.openRegister = async (req, res) => {
    try {
        const { error } = openRegisterSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const register = await CashRegisterService.openCashRegister(
            req.body.employeeId,
            req.body.openingBalance
        );
        res.status(201).send(register);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.closeRegister = async (req, res) => {
    try {
        const { error } = closeRegisterSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const register = await CashRegisterService.closeCashRegister(
            req.params.id,
            req.body.closingBalance
        );
        res.send(register);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.getMovements = async (req, res) => {
    try {
        const movements = await CashRegisterService.getCashRegisterMovements(req.params.id);
        res.send(movements);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.getActiveRegister = async (req, res) => {
    try {
        const register = await CashRegisterService.getActiveCashRegister(req.params.employeeId);
        if (!register) return res.status(404).send('No hay caja activa para este empleado');
        res.send(register);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { CashRegisterController: controllers };