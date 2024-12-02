const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const NewsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },

    content: {
      type: String,
      required: true,
    },

    writer: {
      type: String,
      ref: "admin",
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model("news", NewsSchema);

module.exports = NewsModel;
