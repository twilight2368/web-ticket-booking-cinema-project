const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const appConfig = require("../configs/app.config");

// Configure Cloudinary
cloudinary.config(appConfig.cloudinary.config);

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpg and .png files are allowed!"), false); // Reject the file
  }
};

// Configure Multer (memory storage to hold the image in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter });

const { handlingFileImage } = require("../middlewares/app.middleware");
//TODO: import controllers
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  updateMovieImage,
} = require("../controllers/movie.controller");

const {
  getAllRoomInformation,
  getRoomInformationByShow,
  generateRoom,
} = require("../controllers/room.controller");
const {
  getAllUserInfo,
  getUserInfoByID,
  putChangeUserInfo,
  putChangeUserPassword,
  delDeleteUserProfile,
} = require("../controllers/user.controller");
const {
  getAllNews,
  getNewsTitlesAndBanners,
  getNewsTitlesAndBannersPagination,
  createNews,
  getSpecificNewsById,
  deleteNewsById,
} = require("../controllers/news.controller");
const {
  createShow,
  deleteShow,
  getMovieBeingShown,
  getMovieAboutBeingShown,
  getMovieAndShowsCurrent,
  getAMovieAndItsShowsCurrent,
  getAllShowsWithMovie,
} = require("../controllers/show.controller");

const {
  getBookingInformation,
  getBookingInformationById,
  createBooking,
  getPaymentInfo,
  create_intent_payment,
  updatePaymentAndBookingStatus,
  getAllBookingsWithDetails,
} = require("../controllers/payment.controller");

//TODO: Import Authentication middlewares
const {
  checkAdminLogin,
  checkLoggedIn,
} = require("../middlewares/auth.middleware");

//todo: ----------------------- APP ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from API",
  });
});

//? Movies routes

//TODO: get all movies
router.get("/movies", getAllMovies);

//TODO: get movie by id
router.get("/movies/:movieId", getMovieById);

//TODO: Create movie
router.post(
  "/movies",
  checkAdminLogin,
  upload.single("image"),
  handlingFileImage,
  createMovie
); //? Image require

//TODO: update movie
router.put("/movies/:movieId", checkAdminLogin, updateMovie);
//TODO: Update Movie Image
router.put(
  "/movie-image/:movieId",
  checkAdminLogin,
  upload.single("image"),
  handlingFileImage,
  updateMovieImage
);
//TODO: delete movie
router.delete("/movies/:movieId", checkAdminLogin, deleteMovie);

//? Rooms routes
//todo: Get cinema room information
router.get("/rooms", getAllRoomInformation);
//todo: Get cinema room information with the status of specific shows
router.get("/rooms/:show_id", getRoomInformationByShow);
//todo: Create room
router.post("/create-room", checkAdminLogin, generateRoom);

//? User routes
router.get("/all-users", checkAdminLogin, getAllUserInfo);

router.get("/user/:id", checkLoggedIn, getUserInfoByID);

router.put("/user/:id", checkLoggedIn, putChangeUserInfo);

router.put("/change-user-password/:id", checkLoggedIn, putChangeUserPassword);

router.delete("/delete-profile/:user_id", checkLoggedIn, delDeleteUserProfile);

//? News routes
router.get("/all-news", getAllNews);

router.get("/news-all-titles", getNewsTitlesAndBanners);

router.get("/news", getNewsTitlesAndBannersPagination);

router.post(
  "/news",
  checkAdminLogin,
  upload.single("image"),
  handlingFileImage,
  createNews
); //? Image require

router.get("/news/:id", getSpecificNewsById);

router.delete("/news/:id", checkAdminLogin, deleteNewsById);

//? Shows routes
router.post("/create-shows", checkAdminLogin, createShow);

router.delete("/delete-show/:showId", checkAdminLogin, deleteShow);

router.get("/all-shows", getAllShowsWithMovie);

//todo: Get all movies what will be shown on today and the next 2 days
router.get("/show-movies-today", getMovieBeingShown);
//todo: Get all movies what that release date in from the next 3 days and a  month later
router.get("/show-movies-about-release", getMovieAboutBeingShown);
//todo: Get all movies being shown and their schedule show from current day and the next 2 days
router.get("/show-movie-days", getMovieAndShowsCurrent);
//todo: Get movie information and its schedule on today and the next 2 days
router.get("/show-movie-days/:movieId", getAMovieAndItsShowsCurrent);

//? Payment and booking route
router.get("/booking-info", checkAdminLogin, getBookingInformation);

router.get("/booking-info/:id",  getBookingInformationById);

router.post("/create-booking", checkLoggedIn, createBooking);

router.get("/payment-info/:id", checkAdminLogin, getPaymentInfo);

router.post("/create_intent_payment", checkLoggedIn, create_intent_payment);

router.put("/update-pd-status", checkLoggedIn, updatePaymentAndBookingStatus);

router.get("/all-booking-details",  getAllBookingsWithDetails);

module.exports = router;
