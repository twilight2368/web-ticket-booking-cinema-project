const timeZoneUtil = require("../../utils/helpers/time-zone");
const MovieModel = require("../../models/database/Movie");
const ShowModel = require("../../models/database/Show");
const moment = require("moment-timezone");

// Create Movie with UTC+7 date
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
      image_url: poster_url,
    } = req.body;

    // Validate incoming data
    if (!title || !description || !genre || !duration_in_minutes) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert release date to UTC+7
    const formattedReleaseDate = timeZoneUtil
      .convertToServerTimezone(release_date)
      .toDate();

    const newMovie = new MovieModel({
      title,
      description,
      genre,
      country,
      duration_in_minutes,
      release_date: formattedReleaseDate, // Store in UTC (which will be UTC+7)
      parental_guidance,
      poster_url,
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
      genre,
      country,
      duration_in_minutes,
      release_date,
      parental_guidance,
      image_url: poster_url,
    } = req.body;

    // Convert release_date to UTC+7 if present
    const formattedReleaseDate = timeZoneUtil
      .convertToServerTimezone(release_date)
      .toDate();

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      {
        title,
        description,
        genre,
        country,
        duration_in_minutes,
        formattedReleaseDate,
        parental_guidance,
        image_url: poster_url,
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

//todo: Get all movies what will be shown on today and the next 2 days
const getMovieBeingShown = async (req, res, next) => {
  try {
    // Get the current date in server's timezone (UTC+7)
    const todayInServerZone = timeZoneUtil.getCurrentTimeInServerZone();

    // Calculate the start and end of the date range in server timezone
    const startDate = todayInServerZone.clone().startOf("day");
    const endDate = todayInServerZone.clone().add(2, "days").endOf("day");

    // Convert start and end dates to UTC+7
    const startDateInServerZone = startDate.toDate();
    const endDateInServerZone = endDate.toDate();

    // Query to find shows within the specified range
    const shows = await ShowModel.find({
      date_show: {
        $gte: startDateInServerZone,
        $lte: endDateInServerZone,
      },
    }).populate("movie_id");

    // Extract unique movies being shown in the retrieved shows
    const uniqueMovies = new Map();
    shows.forEach((show) => {
      const movie = show.movie_id;
      if (!uniqueMovies.has(movie._id)) {
        uniqueMovies.set(movie._id, movie);
      }
    });

    // Respond with the list of unique movies
    res.status(200).json({
      status: 200,
      message: "success",
      data: Array.from(uniqueMovies.values()),
    });
  } catch (error) {
    next(error);
  }
};

//todo: Get all movies that will be released in the next 3 days to a month later
const getMovieAboutBeingShown = async (req, res, next) => {
  try {
    // Get the current date in the server's timezone
    const todayInServerZone = timeZoneUtil.getCurrentTimeInServerZone();

    // Calculate the date range in server timezone
    const startDate = todayInServerZone.clone().add(3, "days").startOf("day");
    const endDate = todayInServerZone.clone().add(1, "month").endOf("day");

    // Convert start and end dates to UTC+7
    const startDateInServerZone = startDate.toDate();
    const endDateInServerZone = endDate.toDate();

    // Query movies with release_date in the calculated range
    const movies = await MovieModel.find({
      release_date: {
        $gte: startDateInServerZone,
        $lte: endDateInServerZone,
      },
    });

    // Respond with the list of movies
    res.status(200).json({
      status: 200,
      message: "success",
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

//todo: Get all movies being shown and their schedule from current day and the next 3 days
const getMovieAndShowsCurrent = async (req, res, next) => {
  try {
    // Get the current date in server's timezone
    const todayInServerZone = timeZoneUtil.getCurrentTimeInServerZone();

    // Calculate the start and end of the date range in server timezone
    const startDate = todayInServerZone.clone().startOf("day");
    const endDate = todayInServerZone.clone().add(2, "days").endOf("day");

    // Convert start and end dates to UTC+7
    const startDateInServerZone = startDate.toDate();
    const endDateInServerZone = endDate.toDate();

    // Query to get all shows in the specified range
    const shows = await ShowModel.find({
      date_show: {
        $gte: startDateInServerZone,
        $lte: endDateInServerZone,
      },
    }).populate("movie_id");

    // Initialize an object to group movies and shows by date
    const result = {};

    // Iterate over shows and group them by date
    shows.forEach((show) => {
      // Convert show date to server timezone for formatting
      const showDateInServerZone = moment(show.date_show).tz("Asia/Bangkok");
      const showDate = showDateInServerZone.format("DD-MM-YYYY");

      // Initialize the date group if it doesn't exist
      if (!result[showDate]) {
        result[showDate] = [];
      }

      // Find or add the movie in the date group
      const movie = show.movie_id;
      let movieEntry = result[showDate].find(
        (entry) => entry.movie._id.toString() === movie._id.toString()
      );

      if (!movieEntry) {
        movieEntry = {
          movie: {
            ...movie.toObject(),
            shows: [],
          },
        };
        result[showDate].push(movieEntry);
      }

      // Add the show to the movie's schedule
      movieEntry.movie.shows.push({
        room_id: show.room_id,
        time_start: show.time_start,
        time_end: show.time_end,
      });
    });

    // Respond with the grouped result
    res.status(200).json(result);
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
  getMovieBeingShown,
  getMovieAboutBeingShown,
  getMovieAndShowsCurrent,
};
