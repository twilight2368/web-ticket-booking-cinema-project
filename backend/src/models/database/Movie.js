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
    required: true,
    minlength: 10,
    maxlength: 5000,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Action",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
      "Thriller",
      "Science Fiction",
      "Documentary",
    ],
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
    default: Date.now, // Default to current date
  },
  parental_guidance: {
    type: String,
    enum: ["G", "PG", "PG-13", "R", "NC-17"], // Common MPAA ratings
  },
  poster_url: {
    type: String,
  },
  banner_url: {
    type: String,
  },
});

// Adding an index for title for optimized search
MovieSchema.index({ title: 1 });

const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
