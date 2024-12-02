const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const RoomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  name: {
    type: String,
    default: function () {
      return `Room-${this._id.split("-")[0]}`; // Generate a dynamic name based on the UUID
    },
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
    min: 1, // Ensure total_seats is a positive integer
  },
  num_of_rows: {
    type: Number,
    required: true,
    min: 1, // Ensure num_of_rows is a positive integer
  },
  num_of_cols: {
    type: Number,
    required: true,
    min: 1, // Ensure num_of_cols is a positive integer
  },
  type_room: {
    type: String,
    required: true,
    enum: ["3D", "2D"],
    default: "2D", // Default to "2D" if no value is provided
  },
});

const RoomModel = mongoose.model("room", RoomSchema);

module.exports = RoomModel;
