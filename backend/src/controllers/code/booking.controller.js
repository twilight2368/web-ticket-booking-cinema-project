const MovieModel = require("../models/MovieModel"); // Assuming the model is located here

//TODO: Create a new movie
const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      country,
      duration_in_minutes,
      release_date,
      parental_guidance,
    } = req.body;

    // Validate incoming data
    if (!title || !description || !genre || !duration_in_minutes) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMovie = new MovieModel({
      title,
      description,
      genre,
      country,
      duration_in_minutes,
      release_date,
      parental_guidance,
    });

    await newMovie.save();
    return res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error creating movie", error: err.message });
  }
};

//TODO: Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    return res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error retrieving movies", error: err.message });
  }
};

//TODO: Get a movie by ID
const getMovieById = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await MovieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error retrieving movie", error: err.message });
  }
};

//TODO: Update a movie
const updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const updates = req.body;

  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, updates, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res
      .status(200)
      .json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error updating movie", error: err.message });
  }
};

//TODO: Delete a movie
const deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await MovieModel.findByIdAndDelete(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting movie", error: err.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
