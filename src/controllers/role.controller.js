const { RoleService } = require('../services/role.service');
const Joi = require('joi');

const controllers = {};

const roleSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).allow(null, ''),
  state: Joi.number().valid(0, 1).default(1)
});

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  const roleData = { name, description };

  const { error } = roleSchema.validate(roleData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const role = await RoleService.create(roleData);
    res.status(201).send(role);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const roles = await RoleService.getAll();
    res.send(roles);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const role = await RoleService.getById(req.params.id);
    if (!role) return res.status(404).send("Rol no encontrado");
    res.send(role);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { name, description } = req.body;
  const roleData = { name, description };

  const { error } = roleSchema.validate(roleData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await RoleService.update(req.params.id, roleData);
    if (updated[0] === 0) return res.status(404).send("Rol no encontrado");
    
    const updatedRole = await RoleService.getById(req.params.id);
    res.send({
      message: "Rol actualizado exitosamente",
      role: updatedRole
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await RoleService.delete(req.params.id);
    if (deleted[0] === 0) return res.status(404).send("Rol no encontrado");
    res.send({
      message: "Rol eliminado exitosamente",
      roleId: req.params.id
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { RoleController: controllers };