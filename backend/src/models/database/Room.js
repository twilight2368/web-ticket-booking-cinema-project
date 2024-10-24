const mongoose = require("mongoose");

const { v4: uuid } = require("uuid");

const RoomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  name: {
    type: String,
    default: "Room-?",
    required: true,
  },

  total_seats: {
    type: Number,
    required: true,
  },

  type_room: {
    type: String,
    required: true,
    enum: ["3D", "2D"],
  },
});
