// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { TableController } = require('../controllers/table.controller');

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: Endpoints para la gestión de mesas
 */

/**
 * @swagger
 * /api/tables:
 *   post:
 *     tags: [Tables]
 *     summary: Crear una nueva mesa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Mesa creada exitosamente
 *       400:
 *         description: Error al crear la mesa
 */
router.post('/', TableController.create);

/**
 * @swagger
 * /api/tables:
 *   get:
 *     tags: [Tables]
 *     summary: Obtener todas las mesas
 *     responses:
 *       200:
 *         description: Lista de mesas obtenidas exitosamente
 *       400:
 *         description: Error al obtener todas las mesas
 */
router.get('/', TableController.getAll);

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     tags: [Tables]
 *     summary: Obtener una mesa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa
 *     responses:
 *       200:
 *         description: Mesa encontrada exitosamente
 *       404:
 *         description: Mesa no encontrada
 *       400:
 *         description: Error al obtener la mesa
 */
router.get('/:id', TableController.getById);

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     tags: [Tables]
 *     summary: Actualizar una mesa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Mesa actualizada exitosamente
 *       404:
 *         description: Mesa no encontrada
 *       400:
 *         description: Error al actualizar la mesa
 */
router.put('/:id', TableController.update);

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     tags: [Tables]
 *     summary: Eliminar una mesa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa
 *     responses:
 *       200:
 *         description: Mesa eliminada exitosamente
 *       404:
 *         description: Mesa no encontrada
 *       400:
 *         description: Error al eliminar la mesa
 */
router.delete('/:id', TableController.delete);

module.exports = { TableRoutes: router };
