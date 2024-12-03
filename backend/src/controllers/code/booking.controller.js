const BookingModel = require("../../models/database/Booking");

//TODO: Create a new booking
const createBooking = async (req, res) => {
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
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the booking." });
  }
};

//TODO: Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate("user_id show_id");
    res.status(200).json({ data: bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
};

//TODO: Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findById(id).populate("user_id show_id");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.status(200).json({ data: booking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the booking." });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
};
