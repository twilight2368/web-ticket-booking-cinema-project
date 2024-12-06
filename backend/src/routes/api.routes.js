const express = require("express");
const router = express.Router();

//TODO: import controllers
const {
  getMovieBeingShown,
  getMovieAboutBeingShown,
} = require("../controllers/code/movie.controller");

//todo: ----------------------- APP ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from API",
  });
});

//todo: Get all movies what will be shown on today and the next 2 days
router.get("/movies-today", getMovieBeingShown);

//todo: Get all movies what that release date in from the next 3 days and a  month later
router.get("/movies-about-release", getMovieAboutBeingShown);

module.exports = router;
