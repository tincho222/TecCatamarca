const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  nick: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  num_user: { type: String, required: true, unique: true },
  profile_image: { type: String, default: "default.png" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});

// Middleware para actualizar el campo updated_at antes de cada actualización
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model("User", userSchema, "users");
