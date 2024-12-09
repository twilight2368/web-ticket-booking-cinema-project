//! The order of these models is very important
const Admin = require("./database/Admin");
const User = require("./database/User");
const Movie = require("./database/Movie");
const News = require("./database/News");
const Room = require("./database/Room");
const Seat = require("./database/Seat");
const Show = require("./database/Show");
const Booking = require("./database/Booking");
const Payment = require("./database/Payment");

const init = () => {
  console.log("====================================");
  console.log("Import all models");
  console.log("====================================");
};

init();
