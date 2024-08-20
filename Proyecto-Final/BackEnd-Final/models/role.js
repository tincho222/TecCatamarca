const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  id_roleNum: { type: Number, required: true },
  role_name: { type: String, required: true },
});

module.exports = model("Role", roleSchema, "roles");
