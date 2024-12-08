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
    minlength: 1,
    maxlength: 200,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 5000,
  },
  actors: {
    type: String,
  },
  director: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    maxlength: 100,
  },
  duration_in_minutes: {
    type: Number,
    required: true,
    min: 1,
  },
  release_date: {
    type: Date,
    required: true,
  },
  parental_guidance: {
    type: String,
    enum: ["G", "PG", "PG-13", "R", "NC-17"], // Common MPAA ratings
    required: true,
  },
  image_url: {
    type: String,
  },
  trailer_url: {
    type: String,
    default: "https://www.youtube.com/embed/i63STOtAL2g",
  },
});

// Adding an index for title for optimized search
MovieSchema.index({ title: 1 });

const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
