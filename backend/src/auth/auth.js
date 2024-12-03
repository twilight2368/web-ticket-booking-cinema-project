const express = require("express");

const auth = express();

auth.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

//* ----------------- User controller ---------------------

//TODO: Register user

//TODO: Login user

//TODO: Logout user

//* ----------------- User controller ---------------------

//TODO: Register employee or manager

//TODO: Login employee or manager

//TODO: Logout employee or manager

module.exports = auth;
