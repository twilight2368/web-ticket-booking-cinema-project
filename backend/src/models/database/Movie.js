const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const { genres } = require("../genres/genres.json");
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
  genre: [
    {
      type: String,
      required: true,
      enum: genres,
    },
  ],
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
  trailer_url: {
    type: String,
    validate: {
      validator: function (v) {
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return youtubeRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid YouTube URL!`,
    },
  },
});

// Adding an index for title for optimized search
MovieSchema.index({ title: 1 });

const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
