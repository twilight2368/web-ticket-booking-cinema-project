const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const AdminSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate usernames
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["manager", "employee"],
    required: true,
  },
});

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;
