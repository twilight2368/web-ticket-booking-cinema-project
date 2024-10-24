const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const ShowSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
});
