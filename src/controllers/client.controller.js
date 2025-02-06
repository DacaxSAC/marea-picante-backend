const { ClientService } = require("../services/client.service");
const Joi = require("joi");

const controllers = {}

const clientSchema = Joi.object({
    clientId: Joi.number().integer().positive(),
    dni: Joi.string().max(255).required(),
    names: Joi.string().max(255).required(),
    surnames: Joi.string().max(255).required(),
    cellphone: Joi.string().max(255).required(),
    email: Joi.string().max(255),
    state: Joi.number().integer().positive()
});

controllers.create = async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const client = await ClientService.create(req.body);
    res.status(201).send(client);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const clients = await ClientService.getAll();
    res.send(clients);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const client = await ClientService.getById(req.params.id);
    if (!client) return res.status(404).send("Cliente no encontrado");
    res.send(client);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await ClientService.update(
      req.params.id,
      req.body
    );
    if (updated[0] === 0)
      return res.status(404).send("Cliente no encontrado");
    res.send("Cliente actualizado exitosamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await ClientService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Cliente no encontrado");
    res.send("Cliente eliminado exitosamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { ClientController: controllers }