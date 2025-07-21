const { CategoryService } = require("../services/category.service");
const Joi = require("joi");

const controllers = {}

const categorySchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(255),
});

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  const categoryData = {
    name,
    description
  }

  const { error } = categorySchema.validate(categoryData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await CategoryService.create(categoryData);
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const categories = await CategoryService.getAll();
    res.send(categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const category = await CategoryService.getById(req.params.id);

    if (!category || category.length === 0) return res.status(404).send("Categoría no encontrada");
    res.send(category[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { name, description } = req.body;
  const categoryData = {
    name,
    description
  }

  const { error } = categorySchema.validate(categoryData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await CategoryService.update(
      req.params.id,
      categoryData
    );
    if (updated[0] === 0)
      return res.status(404).send("Categoría no encontrada");
    
    const updatedCategory = await CategoryService.getById(req.params.id);
    res.send({
      message: "Categoría actualizada exitosamente",
      category: updatedCategory[0]
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await CategoryService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Categoría no encontrada");
    res.send({
      message: "Categoría eliminada exitosamente",
      categoryId: req.params.id
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { CategoryController: controllers }