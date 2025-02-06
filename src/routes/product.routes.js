// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/product.controller');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para la gestión de productos (platos).
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId: 
 *                 type: integer
 *                 example: 1
 *               code:
 *                 type: string
 *                 example: "M"
 *               name:
 *                 type: string
 *                 example: "Arroz con Mariscos"
 *               description:
 *                 type: string
 *                 example: "Arroz que tiene mariscos, pescado y langostinos."
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error al crear producto
 */
router.post('/', ProductController.create);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenidos exitosamente
 *       400:
 *         description: Error en obtener todos los productos
 */
router.get('/', ProductController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error en encontrar el producto
 */
router.get('/:id', ProductController.getById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Actualizar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               code:
 *                 type: string
 *                 example: "MAR1"
 *               name:
 *                 type: string
 *                 example: "Arroz con Mariscos Actualizado"
 *               description:
 *                 type: string
 *                 example: "Nueva actualización de arroz con mariscos"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al actualizar el producto
 */
router.put('/:id', ProductController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrada
 *       400:
 *         description: Error al eliminar el producto
 */
router.delete('/:id', ProductController.delete);

module.exports = { ProductRoutes: router };
