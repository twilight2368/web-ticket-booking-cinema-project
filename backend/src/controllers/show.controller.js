const Show = require("../models/database/Show");
const Movie = require("../models/database/Movie");
const Room = require("../models/database/Room");
const timeZoneUtil = require("../utils/helpers/time-zone");

//TODO: Create new show with a specific movie
const createShow = async (req, res, next) => {
  try {
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
    const serverTimeStart = timeZoneUtil.convertToServerTimezone(time_start);
    const serverDateShow = timeZoneUtil.convertToServerTimezone(date_show);
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
      show: {
        ...newShow.toObject(),
        time_start: timeZoneUtil
          .convertToServerTimezone(newShow.time_start)
          .format(),
        time_end: timeZoneUtil
          .convertToServerTimezone(newShow.time_end)
          .format(),
        date_show: timeZoneUtil
          .convertToServerTimezone(newShow.date_show)
          .format("YYYY-MM-DD"),
      },
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

module.exports = {
  createShow,
  deleteShow,
};
