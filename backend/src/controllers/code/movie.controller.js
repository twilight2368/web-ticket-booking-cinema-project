const MovieModel = require("../../models/database/Movie"); // Assuming the model is located here
const ShowModel = require("../../models/database/Show");
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
/**
 * 
 */
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
      message: "success",
      data: Array.from(uniqueMovies.values()),
    });
  } catch (error) {
    next(error);
  }
};

//todo: Get all movies what that release date in from the next 3 days and a  month later
/**
 * 
 */
const getMovieAboutBeingShown = async (req, res, next) => {
  try {
    // Get the current date in the server's timezone
    const today = timeZoneUtil.getCurrentTimeInServerZone();

    // Calculate the date range
    const startDateUtc = timeZoneUtil.getStartOfDayInUtc(
      today.clone().add(3, "days")
    ); // Start of the 3rd day from now in UTC
    const endDateUtc = timeZoneUtil.getEndOfDayInUtc(
      today.clone().add(1, "month")
    ); // End of the day 1 month later in UTC

    // Query movies with release_date in the calculated range
    const movies = await MovieModel.find({
      release_date: {
        $gte: startDateUtc.toDate(),
        $lte: endDateUtc.toDate(),
      },
    });

    // Respond with the list of movies
    res.status(200).json({
      status: 200,
      message: "success",
      data: movies,
    });
  } catch (error) {
    console.error("Error fetching movies about to be shown:", error);
    next(error); // Pass error to the error-handling middleware
  }
};

//todo: Get all movies being shown and their schedule show from current day and the next 3 days
/**
 * example if today is 01-01-2024
 * @return ({
 *   "01-01-2024": [
 *    movie:{
 *     other_attributes of movie,
 *     showns:[]
 *    }
 *  ],
 *  "02-01-2024": [
 *    movie:{
 *     other_attributes of movie,
 *     showns:[]
 *    }
 *  ],
 *  "03-01-2024": [
 *    movie:{
 *     other_attributes of movie,
 *     showns:[]
 *    }
 *  ],
 * })
 */
const getMovieAndShowsCurrent = async (req, res, next) => {
  try {
    // Get the current date in server's timezone
    const today = timeZoneUtil.getCurrentTimeInServerZone();

    // Calculate the start and end of the date range
    const startDateUtc = timeZoneUtil.getStartOfDayInUtc(today); // Start of today in UTC
    const endDateUtc = timeZoneUtil.getEndOfDayInUtc(
      today.clone().add(3, "days")
    ); // End of the 3rd day in UTC

    // Query to get all shows in the specified range
    const shows = await ShowModel.find({
      date_show: {
        $gte: startDateUtc.toDate(),
        $lte: endDateUtc.toDate(),
      },
    }).populate("movie_id"); // Populate movie details

    // Initialize an object to group movies and shows by date
    const result = {};

    // Iterate over shows and group them by date
    shows.forEach((show) => {
      const movie = show.movie_id;

      // Format the show date in server's timezone as "DD-MM-YYYY"
      const showDate = timeZoneUtil
        .convertUtcToServerZone(show.date_show)
        .format("DD-MM-YYYY");

      // Initialize the date group if it doesn't exist
      if (!result[showDate]) {
        result[showDate] = [];
      }

      // Find or add the movie in the date group
      let movieEntry = result[showDate].find(
        (entry) => entry.movie._id === movie._id
      );
      if (!movieEntry) {
        movieEntry = {
          movie: {
            ...movie.toObject(),
            showns: [],
          },
        };
        result[showDate].push(movieEntry);
      }

      // Add the show to the movie's schedule
      movieEntry.movie.showns.push({
        room_id: show.room_id,
        time_start: show.time_start,
        time_end: show.time_end,
      });
    });

    // Respond with the grouped result
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching movies and shows:", error);
    next(error); // Pass error to the error-handling middleware
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMovieBeingShown,
  getMovieAboutBeingShown,
  getMovieAndShowsCurrent,
};
