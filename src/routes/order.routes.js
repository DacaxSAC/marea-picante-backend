const express = require('express');
const router = express.Router();
const { OrderController } = require('../controllers/order.controller');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for managing restaurant orders
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   clientId:
 *                     type: integer
 *                     example: 1
 *                   employeeId:
 *                     type: integer
 *                     example: 1
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                   total:
 *                     type: number
 *                     example: 150.00
 *               orderDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     unitPrice:
 *                       type: number
 *                       example: 25.00
 *                     subtotal:
 *                       type: number
 *                       example: 50.00
 *               tableIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Error creating order
 */
router.post('/', OrderController.create);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 */
router.get('/', OrderController.getAll);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order found successfully
 *       404:
 *         description: Order not found
 */
router.get('/:id', OrderController.getById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags: [Orders]
 *     summary: Update order
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
 *               clientId:
 *                 type: integer
 *               employeeId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put('/:id', OrderController.update);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Update order status
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
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */
router.patch('/:id/status', OrderController.updateStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Delete order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', OrderController.delete);

/**
 * @swagger
 * /api/orders/client/{clientId}:
 *   get:
 *     tags: [Orders]
 *     summary: Get orders by client ID
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orders found successfully
 */
router.get('/client/:clientId', OrderController.getOrdersByClient);

/**
 * @swagger
 * /api/orders/employee/{employeeId}:
 *   get:
 *     tags: [Orders]
 *     summary: Get orders by employee ID
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orders found successfully
 */
router.get('/employee/:employeeId', OrderController.getOrdersByEmployee);

module.exports = { OrderRoutes: router };