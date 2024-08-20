const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Middleware para actualizar el campo updated_at antes de cada actualización
notificationSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model('Notification', notificationSchema, 'notifications');
