const { OrderService } = require("../services/order.service");
const Joi = require("joi");

const controllers = {}

const orderSchema = Joi.object({
  clientId: Joi.number().integer().positive().required(),
  employeeId: Joi.number().integer().positive().required(),
  orderDate: Joi.date(),
  total: Joi.number().precision(2).positive(),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
});

const orderDetailSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required(),
    unitPrice: Joi.number().precision(2).positive().required(),
    subtotal: Joi.number().precision(2).positive().required()
  })
);

controllers.create = async (req, res) => {
  const { error: orderError } = orderSchema.validate(req.body.order);
  const { error: detailsError } = orderDetailSchema.validate(req.body.orderDetails);
  
  if (orderError || detailsError) {
    return res.status(400).send(orderError?.details[0].message || detailsError?.details[0].message);
  }

  try {
    const order = await OrderService.create(
      req.body.order,
      req.body.orderDetails,
      req.body.tableIds
    );
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const orders = await OrderService.getAll();
    res.send(orders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const order = await OrderService.getById(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await OrderService.update(req.params.id, req.body);
    if (updated[0] === 0) return res.status(404).send("Order not found");
    res.send("Order updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.updateStatus = async (req, res) => {
  const statusSchema = Joi.object({
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED').required()
  });

  const { error } = statusSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await OrderService.updateStatus(req.params.id, req.body.status);
    if (updated[0] === 0) return res.status(404).send("Order not found");
    res.send("Order status updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await OrderService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Order not found");
    res.send("Order deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getOrdersByClient = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByClient(req.params.clientId);
    res.send(orders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getOrdersByEmployee = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByEmployee(req.params.employeeId);
    res.send(orders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { OrderController: controllers };