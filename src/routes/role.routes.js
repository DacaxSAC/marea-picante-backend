const express = require('express');
const router = express.Router();
const { RoleController } = require('../controllers/role.controller');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para la gestión de roles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     tags: [Roles]
 *     summary: Crear un nuevo rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Administrador"
 *               description:
 *                 type: string
 *                 example: "Rol con acceso completo al sistema"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error al crear el rol
 */
router.post('/', RoleController.create);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener todos los roles
 *     responses:
 *       200:
 *         description: Lista de roles obtenidos exitosamente
 *       400:
 *         description: Error al obtener todos los roles
 */
router.get('/', RoleController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener un rol por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al obtener el rol
 */
router.get('/:id', RoleController.getById);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Actualizar un rol
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Administrador"
 *               description:
 *                 type: string
 *                 example: "Rol con acceso completo al sistema"
 *               state:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al actualizar el rol
 */
router.put('/:id', RoleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Eliminar un rol
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al eliminar el rol
 */
router.delete('/:id', RoleController.delete);

module.exports = { RoleRoutes: router };