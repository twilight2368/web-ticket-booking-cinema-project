const User = require("../models/database/User");
const bcrypt = require("bcrypt");
const { saltRounds: SALT_ROUNDS } = require("../configs/auth.config");
// * ------------------- ADMIN ----------------------------

// TODO: Get all users' information
const getAllUserInfo = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find(); // Replace 'User' with your database model
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching all users: ", error);
    next(error);
  }
};

// TODO: Get specific user information by ID
const getUserInfoByID = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId); // Replace with your database model and method
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user by ID: ", error);
    next(error);
  }
};

// * ------------------- USER -----------------------------

const putChangeUserPassword = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in the JWT payload
    const { oldPassword, newPassword } = req.body;

    // Find the user and select the password field
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare old password with the user's stored password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect old password" });
    }

    // Check password length
    if (newPassword.length < 8 || newPassword.length > 20) {
      return res
        .status(400)
        .json({ error: "Password must be between 8 and 20 characters long." });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password: ", error);
    next(error);
  }
};

const putChangeUserInfo = async (req, res, next) => {
  try {
    const userIdFromParams = req.params.id;

    const updates = req.body;
    // Perform the update operation
    const user = await User.findByIdAndUpdate(userIdFromParams, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    // If user not found, return 404
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Respond with updated user data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    next(error);
  }
};

// TODO: Delete user profile
const delDeleteUserProfile = async (req, res, next) => {
  try {
    const userIdFromParams = req.params.user_id;

    const user = await User.findByIdAndDelete(userIdFromParams);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile: ", error);
    next(error);
  }
};

module.exports = {
  getAllUserInfo,
  getUserInfoByID,
  putChangeUserInfo,
  putChangeUserPassword,
  delDeleteUserProfile,
};
