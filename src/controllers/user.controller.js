const { UserService } = require('../services/user.service');
const Joi = require('joi');

const controllers = {};

const userSchema = Joi.object({
  nickname: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().min(6).max(1024).required()
});

controllers.create = async (req, res) => {
  const { nickname, email, password } = req.body;
  const userData = { nickname, email, password };

  const { error } = userSchema.validate(userData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await UserService.create(userData);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { nickname, email } = req.body;
  const userData = { nickname, email };

  // Validación parcial para actualización (sin password)
  const updateSchema = Joi.object({
    nickname: Joi.string().min(3).max(255),
    email: Joi.string().email().min(5).max(255)
  });

  const { error } = updateSchema.validate(userData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await UserService.update(req.params.id, userData);
    if (updated[0] === 0) return res.status(404).send("Usuario no encontrado");
    
    const updatedUser = await UserService.getById(req.params.id);
    res.send({
      message: "Usuario actualizado exitosamente",
      user: updatedUser
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await UserService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Usuario no encontrado");
    res.send({
      message: "Usuario eliminado exitosamente",
      userId: req.params.id
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { UserController: controllers };