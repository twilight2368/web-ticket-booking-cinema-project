const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const SeatTypeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },

  name: {
    type: String,
  },

  price: {
    type: Number,
  },
});

const SeatSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  room_id: {
    type: String,
    ref: "room",
  },

  seat_column: {
    type: Number,
  },

  seat_row: {
    type: Number,
  },

  seat_type: {
    type: String,
    ref: "seat_type",
  },
});
