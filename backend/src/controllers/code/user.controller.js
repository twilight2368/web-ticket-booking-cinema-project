const User = require("../../models/database/User");

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

// TODO: Change password
const putChangeUserPassword = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is in the JWT payload
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect old password" });
    }

    // Update password
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password: ", error);
    next(error);
  }
};

// TODO: Change user profile information
const putChangeUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is in the JWT payload
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    next(error);
  }
};

// TODO: Delete user profile
const delDeleteUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is in the JWT payload

    const user = await User.findByIdAndDelete(userId);
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
