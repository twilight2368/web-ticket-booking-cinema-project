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
    required: true, // Ensure a movie is always associated with a show
  },
  room_id: {
    type: String,
    ref: "room",
    required: true, // Ensure a room is always associated with a show
  },
  date_show: {
    type: Date,
    required: true, // Ensure the date of the show is specified
  },
  time_start: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return !this.time_end || value < this.time_end;
      },
      message: "Start time must be before end time.",
    },
  },
  time_end: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return !this.time_start || value > this.time_start;
      },
      message: "End time must be after start time.",
    },
  },
});

// Adding an index for faster query performance
ShowSchema.index({ movie_id: 1, room_id: 1, date_show: 1 });

const ShowModel = mongoose.model("Show", ShowSchema);

module.exports = ShowModel;
