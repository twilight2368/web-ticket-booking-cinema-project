const MovieModel = require("../../models/database/Movie"); // Assuming the model is located here
const ShownModel = require("../../models/database/Show");
const timeZoneUtil = require("../../utils/helpers/time-zone");
//TODO: Create a new movie
const createMovie = async (req, res, next) => {
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
const getAllMovies = async (req, res, next) => {
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
const getMovieById = async (req, res, next) => {
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
const updateMovie = async (req, res, next) => {
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
const deleteMovie = async (req, res, next) => {
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

//todo: Get all movies what will be shown on today and the next 2 days
const getMovieBeingShown = async (req, res, next) => {
  try {
    //TODO: Get the current date in server's timezone (UTC+7)
    const today = timeZoneUtil.getCurrentTimeInServerZone();

    //TODO: Calculate the start and end of the date range (today to next 2 days)
    const startDateUtc = timeZoneUtil.getStartOfDayInUtc(today); // Start of today in UTC
    const endDateUtc = timeZoneUtil.getEndOfDayInUtc(
      today.clone().add(2, "days")
    ); //TODO: End of next 2 days in UTC

    //TODO: Query to find shows within the specified range
    const shows = await ShowModel.find({
      date_show: {
        $gte: startDateUtc.toDate(),
        $lte: endDateUtc.toDate(),
      },
    }).populate("movie_id"); //TODO: Populate movie details

    //TODO: Extract unique movies being shown in the retrieved shows
    const uniqueMovies = new Map();
    shows.forEach((show) => {
      const movie = show.movie_id;
      if (!uniqueMovies.has(movie._id)) {
        uniqueMovies.set(movie._id, movie);
      }
    });

    //TODO: Respond with the list of unique movies
    res.status(200).json({
      status: 200,
      data: Array.from(uniqueMovies.values()),
    });
  } catch (error) {
    console.error("Error fetching movies being shown:", error);
    res.status(500).json({ error: "Failed to fetch movies being shown." });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,

  getMovieBeingShown,
};
