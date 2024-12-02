const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const NewsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },
  },
  { timestamps: true }
);
