

const Notification = require("../models/notifications");

const createNotification = async (req, res) => {
  try {
    const { user_id, message, title, type } = req.body;

    if (!user_id || !message || !title || !type) {
      return res
        .status(400)
        .json({ status: "error", message: "Faltan datos por enviar" });
    }

    const notification = new Notification({
      user_id,
      message,
      title,
      type,
    });

    const savedNotification = await notification.save();

    return res.status(201).json({
      status: "success",
      message: "Notificación creada correctamente",
      notification: savedNotification,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al crear la notificación",
      error: error.message,
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ user_id: userId });

    return res.status(200).json({
      status: "success",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener las notificaciones",
      error: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "Notificación no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notificación marcada como leída",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al marcar la notificación como leída",
      error: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "Notificación no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notificación eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar la notificación",
      error: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};
