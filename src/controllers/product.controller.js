const { ProductService } = require('../services/product.service');
const Joi = require('joi');

const controllers = {}

const productSchema = Joi.object({
  productId: Joi.number().integer().positive(),
  categoryId: Joi.number().integer().positive().required(),
  code: Joi.string().max(255).required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().max(255),
  state: Joi.number().integer().positive()
});

controllers.create = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = await ProductService.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.send(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const product = await ProductService.getById(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await ProductService.update(req.params.id, req.body);
    if (updated[0] === 0) return res.status(404).send('Producto no encontrado');
    res.send('Producto actualizado exitosamente');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await ProductService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send('Producto no encontrado');
    res.send('Producto eliminado exitosamente');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { ProductController: controllers }