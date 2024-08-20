const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  profile_id: { type: Schema.Types.ObjectId, ref: 'TechnicalProfile', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  service_image: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Service', serviceSchema);
