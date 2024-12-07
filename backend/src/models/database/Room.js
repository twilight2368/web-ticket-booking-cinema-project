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
      return "Ghibli...";
    },
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
    min: 1,
  },
  num_of_rows: {
    type: Number,
    required: true,
    min: 1,
  },
  num_of_cols: {
    type: Number,
    required: true,
    min: 1,
  },
});

const RoomModel = mongoose.model("room", RoomSchema);

module.exports = RoomModel;
