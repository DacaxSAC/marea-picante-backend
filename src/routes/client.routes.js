// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { ClientController } = require('../controllers/client.controller');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints para la gestión de clientes
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     tags: [Clients]
 *     summary: Crear un nuevo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "89213422"
 *               names:
 *                 type: string
 *                 example: "Charles Duck"
 *               surnames:
 *                 type: string
 *                 example: "Castillo Rosas"
 *               email:
 *                 type: string
 *                 example: "castillo089frosty@gmail.com"
 *     responses:
 *       201:
 *         description: Cliente creada exitosamente
 *       400:
 *         description: Error al crear el cliente
 */
router.post('/', ClientController.create);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     tags: [Clients]
 *     summary: Obtener todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes obtenidos exitosamente
 *       400:
 *         description: Error al obtener todos las clientes
 */
router.get('/', ClientController.getAll);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     tags: [Clients]
 *     summary: Obtener un cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       400:
 *         description: Error al obtener el cliente
 */
router.get('/:id', ClientController.getById);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     tags: [Clients]
 *     summary: Actualizar un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "43231221"
 *               names:
 *                 type: string
 *                 example: "Charles Actualizado"
 *               surnames:
 *                 type: string
 *                 example: "Castillo Actualizado"
 *               email:
 *                 type: string
 *                 example: "affreadwebset@gmail.com"
 *     responses:
 *       200:
 *         description: Mesa actualizada exitosamente
 *       404:
 *         description: Mesa no encontrada
 *       400:
 *         description: Error al actualizar la mesa
 */
router.put('/:id', ClientController.update);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     tags: [Clients]
 *     summary: Eliminar un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       400:
 *         description: Error al eliminar el cliente
 */
router.delete('/:id', ClientController.delete);

module.exports = { ClientRoutes: router };