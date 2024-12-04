const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");

const auth = express();

auth.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

//* ----------------- User controller ---------------------

//TODO: Register user
auth.post("/register", async (req, res, next) => {
  try {
    const { username, first_name, last_name, email, phone_number, password } =
      req.body;

    // Validate input
    if (
      !username ||
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the username, email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully.", data: savedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
});

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
