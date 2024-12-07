const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cliColor = require("cli-color");
const UserModel = require("../models/database/User");

const { saltRounds: SALT_ROUNDS } = require("../configs/auth.config");

const { issueJWT } = require("../auth/jwt/jsonwebtoken");

//todo: Import middlewares

const {
  checkCookie,
  checkLoggedIn,
  checkIsSessionValid,
} = require("../middlewares/auth.middleware");

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
      return res
        .status(400)
        .json({ error: "Password must be between 8 and 20 characters long." });
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

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
});

//TODO: Login user
router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  (req, res, next) => {
    try {
      const tokenData = issueJWT(req.user);
      return res.json({
        jwt: tokenData.token,
        message: "Successfully logged in",
      });
    } catch (error) {
      next(error);
    }
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
      res.clearCookie("connect.sid");
      req.session.destroy();
      res.json({
        message: "Successfully log out",
      });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/new-token", (req, res, next) => {
  try {
    const tokenData = issueJWT(req.user);
    return res.json({
      jwt: tokenData.token,
      message: "Successfully logged in",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/cookie", checkCookie, (req, res, next) => {
  try {
    res.status(200).json({
      message: "Protected",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/protected", checkLoggedIn, (req, res, next) => {
  try {
    res.status(200).json({
      message: "Protected",
    });
  } catch (error) {
    next(error);
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
