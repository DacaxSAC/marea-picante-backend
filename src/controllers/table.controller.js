const { TableService } = require("../services/table.service");
const Joi = require("joi");

const controllers = {}

const tableSchema = Joi.object({
  number: Joi.number().integer().positive().required(),
  capacity: Joi.number().integer().positive().required(),
  state: Joi.number().integer().positive()
});

controllers.create = async (req, res) => {
  const { number, capacity, state } = req.body;
  const tableData = {
    number,
    capacity,
    state
  }

  const { error } = tableSchema.validate(tableData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const table = await TableService.create(tableData);
    res.status(201).send(table);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const tables = await TableService.getAll();
    res.send(tables);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const table = await TableService.getById(req.params.id);
    if (!table) return res.status(404).send("Mesa no encontrada");
    res.send(table);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { number, capacity, state } = req.body;
  const tableData = {
    number,
    capacity,
    state
  }

  const { error } = tableSchema.validate(tableData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await TableService.update(
      req.params.id,
      tableData
    );
    if (updated[0] === 0)
      return res.status(404).send("Mesa no encontrada");

    const updatedTable = await TableService.getById(req.params.id);
    res.send({
      message: "Mesa actualizada exitosamente",
      category: updatedTable[0]
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await TableService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Mesa no encontrada");
    res.send({
      message: "Mesa eliminada exitosamente",
      tableId: req.params.id
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { TableController: controllers}