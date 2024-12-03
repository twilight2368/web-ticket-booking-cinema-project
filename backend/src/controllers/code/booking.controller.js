const BookingModel = require("../../models/database/Booking");

//TODO: Create a new booking
const createBooking = async (req, res, next) => {
  try {
    const { user_id, show_id, seats, total_price } = req.body;

    // Validate required fields
    if (!user_id || !show_id || !seats || !total_price) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create booking
    const newBooking = new BookingModel({
      user_id,
      show_id,
      seats,
      total_price,
    });

    const savedBooking = await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully.", data: savedBooking });
  } catch (error) {
    next(error);
  }
};

//TODO: Get all bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await BookingModel.find().populate("user_id show_id");
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

//TODO: Get booking by ID
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findById(id).populate("user_id show_id");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.status(200).json({ data: booking });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
};
