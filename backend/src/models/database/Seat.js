const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

// SeatTypeSchema
const SeatTypeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  name: {
    type: String,
    enum: ["Normal", "Vip"], // Valid seat types
    required: true,
  },
  price: {
    type: Number, // Price for the seat type
    required: true,
    min: 0,
  },
});

// SeatSchema
const SeatSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  room_id: {
    type: String,
    ref: "room", // Reference to the "room" collection
    required: true,
  },
  seat_column: {
    type: Number,
    required: true,
    min: 1, // Assuming column numbers start from 1
  },
  seat_row: {
    type: Number,
    required: true,
    min: 1, // Assuming row numbers start from 1
  },
  seat_type: {
    type: String,
    ref: "SeatType", // Reference to the "SeatType" collection
    required: true,
  },
});

const SeatType = mongoose.model("SeatType", SeatTypeSchema);
const Seat = mongoose.model("Seat", SeatSchema);

module.exports = { SeatType, Seat };
