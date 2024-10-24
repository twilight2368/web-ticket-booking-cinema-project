const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const MovieSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  country: {
    type: String,
  },

  duration_in_minutes: {
    type: Number,
    required: true,
  },

  release_date: {
    type: mongoose.Schema.Types.Date,
  },

  parental_guidance: {
    type: String,
  },

  poster_url: {
    type: String,
  },

  banner_url: {
    type: String,
  },
});

const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
