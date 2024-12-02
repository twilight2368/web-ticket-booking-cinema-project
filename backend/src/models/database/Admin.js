const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

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
    minlength: 8, // Enforces stronger passwords
  },
  role: {
    type: String,
    enum: ["manager", "employee"],
    required: true,
  },
});

// Pre-save hook to hash the password
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;
