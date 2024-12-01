const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const ShowSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  movie_id: {
    type: String,
    ref: "movie",
  },

  room_id: {
    type: String,
    ref: "room",
  },

  date_show: {
    type: Date,
  },

  time_start: {
    type: Date,
  },

  time_end: {
    type: Date,
  },
});
