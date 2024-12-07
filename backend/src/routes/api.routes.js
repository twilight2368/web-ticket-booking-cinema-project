const express = require("express");
const router = express.Router();

//TODO: import controllers
const {
  getMovieBeingShown,
  getMovieAboutBeingShown,
  getMovieAndShowsCurrent,
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/code/movie.controller");

const {
  getAllRoomInformation,
  getRoomInformationByShow,
} = require("../controllers/code/room.controller");

//todo: ----------------------- APP ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from API",
  });
});

//? Movies routes
//todo: Get all movies what will be shown on today and the next 2 days
router.get("/movies-today", getMovieBeingShown);
//todo: Get all movies what that release date in from the next 3 days and a  month later
router.get("/movies-about-release", getMovieAboutBeingShown);
//todo: Get all movies being shown and their schedule show from current day and the next 3 days
router.get("/movie-days", getMovieAndShowsCurrent);

//todo: Other movie routes
router.get("/movies", getAllMovies);
router.get("/movies/:movieId", getMovieById);
router.post("/movies", createMovie);
router.put("/movies/:movieId", updateMovie);
router.delete("/movies/:movieId", deleteMovie);

//? Rooms routes
//todo: Get cinema room information
router.get("/rooms", getAllRoomInformation);
//todo: Get cinema room information with the status of specific shows
router.get("/rooms/:show_id", getRoomInformationByShow);

//? User routes

module.exports = router;
