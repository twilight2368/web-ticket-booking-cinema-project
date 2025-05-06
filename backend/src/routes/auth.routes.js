const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cliColor = require("cli-color");
const UserModel = require("../models/database/User");
const AdminModel = require("../models/database/Admin");

const { saltRounds: SALT_ROUNDS } = require("../configs/auth.config");

const { issueJWT } = require("../auth/jwt/jsonwebtoken");

//todo: Import middlewares

const {
  checkCookie,
  checkLoggedIn,
  checkIsSessionValid,
} = require("../middlewares/auth.middleware");
const authConfig = require("../configs/auth.config");

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
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the username, email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // Check password length
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        message: "Password must be between 8 and 20 characters long.",
      });
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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      return next(err); // Forward errors to the next middleware (e.g., error handler)
    }

    if (!user) {
      // Return a 401 Unauthorized error with the specific message
      return res
        .status(401)
        .json({ message: info.message || "Authentication failed" });
    }

    // Log the user in and issue a JWT token
    req.login(user, async (err) => {
      if (err) {
        return next(err); // Forward any errors from login to the next middleware
      }

      const tokenData = issueJWT(req.user); // Issue JWT token

      const user_info = await UserModel.findById(req.user.id);

      console.log("User Logged In:", user.id);
      console.log("Session ID:", req.sessionID);

      // Manually check and log cookie details
      console.log("Session Cookie:", req.session.cookie);

      return res.json({
        user_info: user_info,
        user_id: req.user.id,
        jwt: tokenData.token,
        message: "Successfully logged in",
      });
    });
  })(req, res, next); // Execute the authentication
});

//TODO: Logout user
router.get("/logout", (req, res, next) => {
  try {
    console.log("====================================");
    console.log(cliColor.yellow("Someone logging out ..."));
    console.log("====================================");
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      //* NOTE: For stateless JWT, logout is client-side; down here just the session logout
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

//TODO: Get new JWT token
router.get("/new-token", checkCookie, checkIsSessionValid, (req, res, next) => {
  try {
    const tokenData = issueJWT(req.user);
    return res.json({
      jwt: tokenData.token,
      message: "Successfully get token",
    });
  } catch (error) {
    next(error);
  }
});

//! Testing only: Check cookie
router.get("/cookie", checkCookie, (req, res, next) => {
  try {
    res.status(200).json({
      message: "Protected",
    });
  } catch (error) {
    next(error);
  }
});

//! Testing only
router.get("/header", checkLoggedIn, (req, res, next) => {
  console.log("====================================");
  console.log(req.user);
  console.log("====================================");
  res.json({
    data: "Hello world",
  });
});

//! Testing only
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

//TODO: Register admin
router.post("/admin-register", async (req, res, next) => {
  try {
    const { username, password, secret } = req.body;

    console.log("====================================");
    console.log(username, password, secret);
    console.log("====================================");

    // Validate input
    if (!username || !password || !secret) {
      return res
        .status(400)
        .json({ message: "All needed information are required." });
    }

    // Check the secret password
    if (secret !== authConfig.admin_secret_password) {
      return res
        .status(400)
        .json({ message: "All secret information are required." });
    }

    // Check if the username already exists
    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new admin
    const newAdmin = new AdminModel({
      username,
      password: hashedPassword,
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
});

//TODO: Login admin
router.post("/admin-login", async (req, res, next) => {
  try {
    const { username, password, secret } = req.body;

    console.log("====================================");
    console.log(username, password, secret);
    console.log("====================================");

    // Validate input
    if (!username || !password || !secret) {
      return res
        .status(400)
        .json({ message: "All needed information are required." });
    }

    // Check the secret password
    if (secret !== authConfig.admin_secret_password) {
      return res
        .status(400)
        .json({ message: "All secret information are required." });
    }

    // Find the admin
    const admin = await AdminModel.findOne({ username }).select("+password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const tokenData = issueJWT(admin);
    return res.json({
      admin: {
        id: admin.id,
        username: admin.username,
      },
      jwt: tokenData.token,
      message: "Successfully logged in",
    });
  } catch (error) {
    next(error);
  }
});

//TODO: Logout admin
router.get("/admin-logout", (req, res, next) => {
  //? For stateless JWT, logout is client-side;
  res.status(200).json({ message: "Logout successful." });
});

module.exports = router;
