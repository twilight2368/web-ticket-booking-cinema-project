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
    const userId = req.user.id;
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

const putChangeUserInfo = async (req, res, next) => {
  try {
    const userIdFromParams = req.params.user_id;
    const userIdFromToken = req.user.id;

    // Check if the user IDs match
    if (userIdFromParams !== userIdFromToken) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this user's information.",
      });
    }

    const updates = req.body;

    // Perform the update operation
    const user = await User.findByIdAndUpdate(userIdFromToken, updates, {
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
    const userIdFromToken = req.user.id;

    // Check if the user IDs match
    if (userIdFromParams !== userIdFromToken) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this user's information.",
      });
    }

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
