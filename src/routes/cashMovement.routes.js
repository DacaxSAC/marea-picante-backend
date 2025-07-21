const express = require('express');
const router = express.Router();
const { CashMovementController } = require('../controllers/cashMovement.controller');

/**
 * @swagger
 * tags:
 *   name: Cash Movements
 *   description: Endpoints para gestión de movimientos de caja
 */

/**
 * @swagger
 * /api/cash-movements:
 *   post:
 *     tags: [Cash Movements]
 *     summary: Crear un nuevo movimiento de caja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cashRegisterId:
 *                 type: integer
 *               orderId:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: [INGRESO, EGRESO]
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [EFECTIVO, TARJETA, TRANSFERENCIA, OTRO]
 *     responses:
 *       201:
 *         description: Movimiento creado exitosamente
 */
router.post('/', CashMovementController.createMovement);

/**
 * @swagger
 * /api/cash-movements/by-date:
 *   get:
 *     tags: [Cash Movements]
 *     summary: Obtener movimientos por rango de fechas
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida exitosamente
 */
router.get('/by-date', CashMovementController.getByDateRange);

/**
 * @swagger
 * /api/cash-movements/daily-summary:
 *   get:
 *     tags: [Cash Movements]
 *     summary: Obtener resumen diario de movimientos
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Resumen diario obtenido exitosamente
 */
router.get('/daily-summary', CashMovementController.getDailySummary);

module.exports = { CashMovementRoutes: router };