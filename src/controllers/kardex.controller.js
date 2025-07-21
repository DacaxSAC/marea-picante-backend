const { KardexService } = require('../services/kardex.service');
const Joi = require('joi');

const controllers = {};

const purchaseSchema = Joi.object({
    products: Joi.array().items(
        Joi.object({
            productId: Joi.number().integer().required(),
            quantity: Joi.number().integer().min(1).required(),
            unitPrice: Joi.number().precision(2).min(0).required()
        })
    ).required(),
    documentNumber: Joi.string().required()
});

const adjustmentSchema = Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    type: Joi.string().valid('ENTRADA', 'SALIDA').required(),
    reason: Joi.string().required()
});

controllers.registerPurchase = async (req, res) => {
    try {
        const { error } = purchaseSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await KardexService.registerPurchase(req.body);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.registerAdjustment = async (req, res) => {
    try {
        const { error } = adjustmentSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await KardexService.registerAdjustment(req.body);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

controllers.getProductKardex = async (req, res) => {
    try {
        const kardex = await KardexService.getProductKardex(
            req.params.productId,
            req.query.startDate,
            req.query.endDate
        );
        res.send(kardex);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Nuevo controlador para el resumen de kardex
controllers.getKardexSummary = async (req, res) => {
    try {
        const summary = await KardexService.getKardexSummary();
        res.send(summary);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { KardexController: controllers };