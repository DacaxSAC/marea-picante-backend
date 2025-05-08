const { Order } = require('../models/order.model');
const { OrderDetail } = require('../models/orderDetail.model');
const { OrderTable } = require('../models/orderTable.model');
const { Table } = require('../models/table.model');
const { Product } = require('../models/product.model');
const sequelize = require('../utils/database.util');

const services = {}

services.create = async (orderData, orderDetails, tableIds) => {
  try {
    // Create order with transaction to ensure data consistency
    const result = await sequelize.transaction(async (t) => {
      // Create the main order
      const order = await Order.create(orderData, { transaction: t });

      // Create order details
      const detailsWithOrderId = orderDetails.map(detail => ({
        ...detail,
        orderId: order.orderId
      }));
      await OrderDetail.bulkCreate(detailsWithOrderId, { transaction: t });

      // Associate tables with the order
      const tableAssociations = tableIds.map(tableId => ({
        orderId: order.orderId,
        tableId: tableId
      }));
      await OrderTable.bulkCreate(tableAssociations, { transaction: t });

      return order;
    });

    return result;
  } catch (error) {
    throw new Error('Error creating order: ' + error.message);
  }
};

services.getAll = async () => {
  return await Order.findAll({
    include: [
      { model: OrderDetail, as: 'orderDetails', include: [Product] },
      { model: Table, through: OrderTable }
    ]
  });
};

services.getById = async (orderId) => {
  return await Order.findByPk(orderId, {
    include: [
      { model: OrderDetail, as: 'orderDetails', include: [Product] },
      { model: Table, through: OrderTable }
    ]
  });
};

services.update = async (orderId, orderData) => {
  return await Order.update(orderData, { 
    where: { orderId: orderId }
  });
};

services.updateStatus = async (orderId, status) => {
  return await Order.update(
    { status: status },
    { where: { orderId: orderId } }
  );
};

services.delete = async (orderId) => {
  return await Order.destroy({
    where: { orderId: orderId }
  });
};

services.getOrdersByClient = async (clientId) => {
  return await Order.findAll({
    where: { clientId: clientId },
    include: [
      { model: OrderDetail, as: 'orderDetails', include: [Product] },
      { model: Table, through: OrderTable }
    ]
  });
};

services.getOrdersByEmployee = async (employeeId) => {
  return await Order.findAll({
    where: { employeeId: employeeId },
    include: [
      { model: OrderDetail, as: 'orderDetails', include: [Product] },
      { model: Table, through: OrderTable }
    ]
  });
};

module.exports = { OrderService: services };