const timeZoneUtil = require("../utils/helpers/time-zone");
const MovieModel = require("../models/database/Movie");
const appConfig = require("../configs/app.config");

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching all movies:", error);
    next(error); // Pass error to error-handling middleware
  }
};

// Create Movie with UTC+7 date
const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      actors,
      director,
      genre,
      country,
      duration_in_minutes,
      release_date, //YYYY-MM-DD (UTC+7)
      parental_guidance,
      image_url = appConfig.cloudinary.image.default_poster_movie,
      trailer_url = "https://www.youtube.com/embed/i63STOtAL2g",
    } = req.body;

    // Validate incoming data
    if (
      !title ||
      !description ||
      !genre ||
      !duration_in_minutes ||
      !release_date ||
      !parental_guidance
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert release date to UTC+7
    const formattedReleaseDate = timeZoneUtil
      .convertDateToServerTimezone(release_date)
      .toDate();

    const newMovie = new MovieModel({
      title,
      description,
      actors,
      director,
      genre,
      country,
      duration_in_minutes,
      release_date: formattedReleaseDate, // Store in UTC (which will be UTC+7)
      parental_guidance,
      image_url,
      trailer_url,
    });

    await newMovie.save();
    return res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    next(error);
  }
};

// Update Movie
const updateMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const {
      title,
      description,
      actors,
      director,
      genre,
      country,
      duration_in_minutes,
      release_date, // YYYY-MM-DD (UTC+7)
      parental_guidance,
      image_url,
      trailer_url,
    } = req.body;

    // Convert release_date to UTC+7 if present
    const formattedReleaseDate = timeZoneUtil
      .convertDateToServerTimezone(release_date)
      .toDate();

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      {
        title,
        description,
        actors,
        director,
        genre,
        country,
        duration_in_minutes,
        formattedReleaseDate,
        parental_guidance,
        image_url,
        trailer_url,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Update Movie Image
const updateMovieImage = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const { image_url } = req.body;

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      {
        image_url,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Delete a movie
const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await MovieModel.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get Movie by ID with formatted dates
const getMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await MovieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  updateMovieImage,
};
