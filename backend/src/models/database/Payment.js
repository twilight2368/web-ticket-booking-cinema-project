const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const PaymentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
});
