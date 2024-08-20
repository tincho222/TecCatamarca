const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  quantity: { type: Number, default: 1 },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Middleware para actualizar el campo updated_at antes de cada actualización
orderSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model("Order", orderSchema, "orders");
