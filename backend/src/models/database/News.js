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

    title: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 100,
    },

    banner: {
      type: String,
    },

    writer: {
      type: String,
      ref: "admin",
    },

    write_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model("news", NewsSchema);

module.exports = NewsModel;
