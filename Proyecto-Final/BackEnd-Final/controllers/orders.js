/* const User = require("../models/user");  */
const Service = require("../models/services");
const Order = require("../models/orders");

const createOrder = async (req, res) => {
    try {
      const userId = req.user.id; // Asegúrate de que req.user esté disponible y contenga el ID del usuario autenticado
      const { service_id, quantity } = req.body;
  
      // Verificar que todos los campos necesarios estén presentes
      if (!service_id || !quantity) {
        return res.status(400).json({ status: "error", message: "Faltan datos por enviar" });
      }
  
      // Obtener el servicio para calcular el precio total
      const service = await Service.findById(service_id);
      if (!service) {
        return res.status(404).json({ status: "error", message: "Servicio no encontrado" });
      }
  
      // Calcular el precio total
      const totalPrice = service.price * quantity;
  
      // Crear el pedido
      const order = new Order({
        user_id: userId,
        service_id: service._id,
        quantity,
        total_price: totalPrice
      });
  
      // Guardar el pedido en la base de datos
      const savedOrder = await order.save();
  
      // Devolver una respuesta de éxito
      return res.status(201).json({
        status: "success",
        message: "Pedido creado correctamente",
        order: savedOrder
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al crear el pedido",
        error: error.message
      });
    }
  };

  const listOrders = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, user_id } = req.query;
  
      const query = {};
      if (status) query.status = status;
      if (user_id) query.user_id = user_id;
  
      const orders = await Order.find(query)
        .populate('user_id', 'first_name last_name email')
        .populate('service_id', 'title price')
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const totalOrders = await Order.countDocuments(query);
  
      return res.status(200).json({
        status: "success",
        total: totalOrders,
        page,
        limit,
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener las órdenes",
        error: error.message,
      });
    }
  };
  const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('user_id', 'first_name last_name email')
        .populate('service_id', 'title price');
  
      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Orden no encontrada",
        });
      }
  
      return res.status(200).json({
        status: "success",
        order,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener la orden",
        error: error.message,
      });
    }
  };
  const updateOrder = async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Orden no encontrada",
        });
      }
  
      if (status) order.status = status;
      order.updated_at = Date.now();
      
      const updatedOrder = await order.save();
  
      return res.status(200).json({
        status: "success",
        message: "Orden actualizada correctamente",
        order: updatedOrder,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar la orden",
        error: error.message,
      });
    }
  };
  const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
  
      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Orden no encontrada",
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: "Orden eliminada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al eliminar la orden",
        error: error.message,
      });
    }
  };
  
  
  
//exportar 
module.exports = {
    createOrder,
    listOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
}