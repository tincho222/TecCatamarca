const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Middleware para actualizar el campo updated_at antes de cada actualización
reviewSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model("Review", reviewSchema, "reviews");
    