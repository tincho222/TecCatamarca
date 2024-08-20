const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id_categories: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);