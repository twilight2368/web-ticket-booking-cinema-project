const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cliColor = require("cli-color");
const UserModel = require("../models/database/User");
const { saltRounds: SALT_ROUNDS } = require("../configs/auth.config");
const router = express.Router();

//todo: ----------------------- AUTH ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from AUTH",
  });
});

//* ----------------- User auth route ---------------------

//TODO: Register user
router.post("/register", async (req, res, next) => {
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

    // Check password length
    if (password.length < 8 || password.length > 20) {
      throw new Error("Password must be between 8 and 20 characters long.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

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
    next(err);
  }
});

//TODO: Login user
router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  (req, res, next) => {
    return res.json({
      jwt: "",
      message: "Successfully login",
    });
  }
);

//TODO: Logout user
router.post("/logout", (req, res, next) => {
  try {
    console.log("====================================");
    console.log(cliColor.yellow("Someone logging out ..."));
    console.log("====================================");
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid"); //todo: Clear the session cookie
      req.session.destroy(); //todo: delete session out of database
      res.json({
        message: "Successfully log out",
      });
    });
  } catch (error) {
    next(err);
  }
});

//* ----------------- Admin auth route ---------------------

//TODO: Register employee or manager
router.post("/admin-register", (req, res, next) => {});

//TODO: Login employee or manager
router.post("/admin-login", (req, res, next) => {});

//TODO: Logout employee or manager
router.post("/admin-logout", (req, res, next) => {});

module.exports = router;
