const Review = require("../models/reviews");
const Order = require("../models/orders");

const createReview = async (req, res) => {
  try {
    const userId = req.user.id; // Asegúrate de que req.user esté disponible y contenga el ID del usuario autenticado
    const { order_id, rating, comment } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!order_id || rating === undefined) {
      return res.status(400).json({ status: "error", message: "Faltan datos por enviar" });
    }

    // Verificar que la orden exista y que pertenezca al usuario autenticado
    const order = await Order.findOne({ _id: order_id, user_id: userId });
    if (!order) {
      return res.status(404).json({ status: "error", message: "Orden no encontrada o no pertenece al usuario autenticado" });
    }

    // Crear la reseña
    const review = new Review({
      order_id,
      rating,
      comment
    });

    // Guardar la reseña en la base de datos
    const savedReview = await review.save();

    // Devolver una respuesta de éxito
    return res.status(201).json({
      status: "success",
      message: "Reseña creada correctamente",
      review: savedReview
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al crear la reseña",
      error: error.message
    });
  }
};

const listReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("order_id").exec();

    return res.status(200).json({
      status: "success",
      reviews
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al listar las reseñas",
      error: error.message
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("order_id").exec();

    if (!review) {
      return res.status(404).json({ status: "error", message: "Reseña no encontrada" });
    }

    return res.status(200).json({
      status: "success",
      review
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener la reseña",
      error: error.message
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Verificar que los campos necesarios estén presentes
    if (rating === undefined) {
      return res.status(400).json({ status: "error", message: "Faltan datos por enviar" });
    }

    // Actualizar la reseña
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ status: "error", message: "Reseña no encontrada" });
    }

    return res.status(200).json({
      status: "success",
      message: "Reseña actualizada correctamente",
      review: updatedReview
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar la reseña",
      error: error.message
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ status: "error", message: "Reseña no encontrada" });
    }

    return res.status(200).json({
      status: "success",
      message: "Reseña eliminada correctamente"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar la reseña",
      error: error.message
    });
  }
};

module.exports = {
  createReview,
  listReviews,
  getReviewById,
  updateReview,
  deleteReview
};