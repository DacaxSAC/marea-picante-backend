const express = require('express');
const router = express.Router();
const { CashRegisterController } = require('../controllers/cashRegister.controller');

/**
 * @swagger
 * tags:
 *   name: Cash Register
 *   description: Endpoints para gestión de caja
 */

/**
 * @swagger
 * /api/cash-register/open:
 *   post:
 *     tags: [Cash Register]
 *     summary: Abrir una nueva caja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               openingBalance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Caja abierta exitosamente
 */
router.post('/open', CashRegisterController.openRegister);

/**
 * @swagger
 * /api/cash-register/{id}/close:
 *   put:
 *     tags: [Cash Register]
 *     summary: Cerrar una caja
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               closingBalance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Caja cerrada exitosamente
 */
router.put('/:id/close', CashRegisterController.closeRegister);

/**
 * @swagger
 * /api/cash-register/{id}/movements:
 *   get:
 *     tags: [Cash Register]
 *     summary: Obtener movimientos de una caja
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida exitosamente
 */
router.get('/:id/movements', CashRegisterController.getMovements);

/**
 * @swagger
 * /api/cash-register/employee/{employeeId}/active:
 *   get:
 *     tags: [Cash Register]
 *     summary: Obtener caja activa de un empleado
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Caja activa encontrada
 */
router.get('/employee/:employeeId/active', CashRegisterController.getActiveRegister);

module.exports = { CashRegisterRoutes: router };