// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { EmployeeController } = require('../controllers/employee.controller');

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Endpoints para la gestión de empleados
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     tags: [Employees]
 *     summary: Crear un nuevo empleado
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
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error al crear el empleado
 */
router.post('/', EmployeeController.create);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     tags: [Employees]
 *     summary: Obtener todos los empleados
 *     responses:
 *       200:
 *         description: Lista de empleados obtenidos exitosamente
 *       400:
 *         description: Error al obtener todos las empleados
 */
router.get('/', EmployeeController.getAll);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     tags: [Employees]
 *     summary: Obtener un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       400:
 *         description: Error al obtener el empleado
 */
router.get('/:id', EmployeeController.getById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     tags: [Employees]
 *     summary: Actualizar un empleado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "12321221"
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
 *         description: Empleado actualizado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       400:
 *         description: Error al actualizar el empleado
 */
router.put('/:id', EmployeeController.update);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     tags: [Employees]
 *     summary: Eliminar un empleado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       400:
 *         description: Error al eliminar el empleado
 */
router.delete('/:id', EmployeeController.delete);

module.exports = { EmployeeRoutes: router };
