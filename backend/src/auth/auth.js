const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require("passport");
var routes = require("./routes/authRoute");

const auth = express();

auth.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

//* ----------------- User controller ---------------------

//TODO: Register user
auth.post("/register", (req, res, next) => {});

//TODO: Login user
auth.post("/login", (req, res, next) => {});

//TODO: Logout user
auth.post("/logout", (req, res, next) => {});

//* ----------------- User controller ---------------------

//TODO: Register employee or manager
auth.post("/admin-register", (req, res, next) => {});

//TODO: Login employee or manager
auth.post("/admin-login", (req, res, next) => {});

//TODO: Logout employee or manager
auth.post("/admin-logout", (req, res, next) => {});

module.exports = auth;
