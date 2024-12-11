const Show = require("../models/database/Show");
const Movie = require("../models/database/Movie");
const Room = require("../models/database/Room");
const timeZoneUtil = require("../utils/helpers/time-zone");
const moment = require("moment");

//TODO: Get all shows
const getAllShowsWithMovie = async (req, res, next) => {
  try {
    const allShows = await Show.find().populate("movie_id").populate("room_id");

    res.json(allShows);
  } catch (error) {
    next(error);
  }
};

//TODO: Create new show with a specific movie
const createShow = async (req, res, next) => {
  try {
    /**
     * movie_id
     * room_id
     * date_show: YYYY-MM-DD (UTC+7)
     * time_start: HH:MM (UTC+7)
     */
    const { movie_id, room_id, date_show, time_start } = req.body;

    // Fetch movie details to get duration
    const movie = await Movie.findById(movie_id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Fetch movie details to get duration
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Convert input times to server timezone (UTC+7)

    const serverDateShow = timeZoneUtil.convertDateToServerTimezone(date_show);

    const serverTimeStart = timeZoneUtil.convertDateAndTimeToServerTimezone(
      `${date_show} ${time_start}`
    );
    const serverTimeEnd = moment(serverTimeStart).add(
      movie.duration_in_minutes,
      "minutes"
    );

    // Check for overlapping shows in the same room
    const existingShows = await Show.find({
      room_id: room_id,
      date_show: {
        $eq: serverDateShow.toDate(),
      },
      $or: [
        // New show starts during an existing show
        {
          time_start: { $lt: serverTimeEnd.toDate() },
          time_end: { $gt: serverTimeStart.toDate() },
        },
        // New show completely encompasses an existing show
        {
          time_start: {
            $gte: serverTimeStart.toDate(),
            $lt: serverTimeEnd.toDate(),
          },
          time_end: { $lte: serverTimeEnd.toDate() },
        },
        // Existing show completely encompasses the new show
        {
          time_start: { $lte: serverTimeStart.toDate() },
          time_end: { $gte: serverTimeEnd.toDate() },
        },
      ],
    });

    // If there are overlapping shows, return an error
    if (existingShows.length > 0) {
      return res.status(400).json({
        message: "Room is not available.",
        shows: existingShows.map((show) => ({
          showId: show._id,
          startTime: timeZoneUtil
            .convertToServerTimezone(show.time_start)
            .format(),
          endTime: timeZoneUtil.convertToServerTimezone(show.time_end).format(),
        })),
      });
    }

    // Create new show (storing in UTC, but calculated in UTC+7)
    const newShow = new Show({
      movie_id,
      room_id,
      date_show: serverDateShow.toDate(),
      time_start: serverTimeStart.toDate(),
      time_end: serverTimeEnd.toDate(),
    });

    // Save the show
    await newShow.save();

    res.status(201).json({
      message: "Show created successfully",
      show: newShow,
    });
  } catch (error) {
    console.error("Error creating show:", error);
    next(error);
  }
};

//TODO: Delete a specific show
const deleteShow = async (req, res, next) => {
  try {
    const { showId } = req.params;

    // Find and delete the show
    const deletedShow = await Show.findByIdAndDelete(showId);

    if (!deletedShow) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({
      message: "Show deleted successfully",
    });
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
    const shows = await Show.find({
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
    const movies = await Movie.find({
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

//todo: Get all movies being shown and their schedule from current day and the next 2 days
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
    const shows = await Show.find({
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
        id: show.id,
        room_id: show["room_id"],
        date_show: show["date_show"],
        time_start: show["time_start"],
        time_end: show["time_end"],
      });
    });

    // Respond with the grouped result
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//todo: Get movie information and its schedule on today and the next 2 days
const getAMovieAndItsShowsCurrent = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required",
      });
    }

    const currentTime = timeZoneUtil.getCurrentTimeInServerZone();
    const endDate = moment(currentTime).add(2, "days").endOf("day");

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const shows = await Show.aggregate([
      {
        $match: {
          movie_id: movieId,
          date_show: {
            $gte: currentTime.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $sort: { date_show: 1, time_start: 1 },
      },
    ]);

    const showsByDate = shows.reduce((acc, show) => {
      const formattedDate = moment(show.date_show).format("DD-MM-YYYY");

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push({
        _id: show._id,
        time_start: show.time_start,
        time_end: show.time_end,
        room_id: show.room_id,
      });

      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        movie: {
          _id: movie._id,
          title: movie.title,
          description: movie.description,
          duration_in_minutes: movie.duration_in_minutes,
          genre: movie.genre,
          image_url: movie.image_url,
          trailer_url: movie.trailer_url,
        },
        shows: showsByDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShow,
  deleteShow,
  getMovieBeingShown,
  getMovieAboutBeingShown,
  getMovieAndShowsCurrent,
  getAMovieAndItsShowsCurrent,
  getAllShowsWithMovie,
};
