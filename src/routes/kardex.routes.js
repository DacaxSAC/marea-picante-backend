const express = require('express');
const router = express.Router();
const { KardexController } = require('../controllers/kardex.controller');

/**
 * @swagger
 * tags:
 *   name: Kardex
 *   description: Endpoints para gestión de kardex de productos
 */

/**
 * @swagger
 * /api/kardex/purchase:
 *   post:
 *     tags: [Kardex]
 *     summary: Registrar una compra en el kardex
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     unitPrice:
 *                       type: number
 *               documentNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compra registrada exitosamente
 */
router.post('/purchase', KardexController.registerPurchase);

/**
 * @swagger
 * /api/kardex/adjustment:
 *   post:
 *     tags: [Kardex]
 *     summary: Registrar un ajuste de inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: [ENTRADA, SALIDA]
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ajuste registrado exitosamente
 */
router.post('/adjustment', KardexController.registerAdjustment);

/**
 * @swagger
 * /api/kardex/product/{productId}:
 *   get:
 *     tags: [Kardex]
 *     summary: Obtener kardex de un producto
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Kardex del producto obtenido exitosamente
 */
router.get('/product/:productId', KardexController.getProductKardex);

/**
 * @swagger
 * /api/kardex/summary:
 *   get:
 *     tags: [Kardex]
 *     summary: Obtener resumen general del kardex
 *     responses:
 *       200:
 *         description: Resumen del kardex obtenido exitosamente
 */
router.get('/summary', KardexController.getKardexSummary);

module.exports = { KardexRoutes: router };