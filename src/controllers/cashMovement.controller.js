const { CashMovementService } = require('../services/cashMovement.service');
const Joi = require('joi');

const controllers = {};

const movementSchema = Joi.object({
    cashRegisterId: Joi.number().integer().required(),
    orderId: Joi.number().integer(),
    type: Joi.string().valid('INGRESO', 'EGRESO').required(),
    amount: Joi.number().precision(2).required(),
    description: Joi.string().required(),
    paymentMethod: Joi.string().valid('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO').required()
});

controllers.createMovement = async (req, res) => {
    try {
        const { error } = movementSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const movement = await CashMovementService.createMovement(req.body);
        res.status(201).send(movement);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.getByDateRange = async (req, res) => {
    try {
        const movements = await CashMovementService.getMovementsByDate(
            req.query.startDate,
            req.query.endDate
        );
        res.send(movements);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.getDailySummary = async (req, res) => {
    try {
        const summary = await CashMovementService.getDailySummary(req.query.date);
        res.send(summary);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { CashMovementController: controllers };