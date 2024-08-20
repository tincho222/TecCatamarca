const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technicalProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  local_name: { type: String, required: true },
  bio: { type: String, required: false },
  skills: { type: [String], required: false },
  rating: { type: Number, required: true },
  email_technical:{ type: String, required:true},
  profile_image: { type: String, required: false },
  num_technical: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  address: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TechnicalProfile', technicalProfileSchema);
