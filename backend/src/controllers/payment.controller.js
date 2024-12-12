const appConfig = require("../configs/app.config");
const sendPaymentConfirmationEmail = require("../mail/nodemailer");
const stripe = require("stripe")(appConfig.stripe.private_key);
const BookingModel = require("../models/database/Booking");
const PaymentModel = require("../models/database/Payment");
const ShowModel = require("../models/database/Show");
const { Seat } = require("../models/database/Seat");
const Room = require("../models/database/Room");

//TODO: Get all booking information
const getBookingInformation = async (req, res, next) => {
  try {
    const bookings = await BookingModel.find(); // Replace with appropriate DB query for your use case
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

const getAllBookingsWithDetails = async (req, res, next) => {
  try {
    // Extract pagination parameters with default values
    const { page = 1, limit = 10 } = req.query;

    // Ensure page and limit are positive integers
    const parsedPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const parsedLimit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;

    // Query for booking data with pagination and populate
    const bookings = await BookingModel.find()
      .populate("user_id", "-password") // Fully populate user details
      .populate({
        path: "show_id",
        populate: [
          { path: "movie_id" }, // Fully populate movie details
          { path: "room_id" }, // Fully populate room details
        ],
      })
      .populate("seats") // Fully populate seat details
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    // Get total count of bookings for pagination metadata
    const total = await BookingModel.countDocuments();

    // Return response with pagination info
    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Get all booking information by id
const getBookingInformationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }

    const booking = await BookingModel.findById(id)
      .populate({
        path: "show_id",
        populate: [
          { path: "movie_id" }, // Populate movie details
          { path: "room_id", select: "-seats" }, // Populate room details excluding seats
        ],
      })
      .populate("seats")
      .select("-user_id");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

//TODO: Get payment information
const getPaymentInfo = async (req, res, next) => {
  try {
    const paymentId = req.params.id; // Payment ID from request parameters
    const payment = await PaymentModel.findById(paymentId); // Find payment by ID

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment information: ", error);
    next(error); // Pass the error to middleware
  }
};

//TODO: Create booking with status pending
const createBooking = async (req, res, next) => {
  try {
    const { user_id, show_id, seats, total_price } = req.body;

    // Validate required fields
    if (
      !user_id ||
      !show_id ||
      !seats ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      !total_price
    ) {
      return res.status(400).json({
        message:
          "Missing or invalid required fields: user_id, show_id, seats (must be a non-empty array), or total_price.",
      });
    }

    // Fetch the show details
    const show = await ShowModel.findById(show_id);
    if (!show) {
      return res.status(404).json({ message: "Show not found." });
    }

    // Validate the seats
    const seatDocuments = await Seat.find({
      _id: { $in: seats },
      room_id: show.room_id,
    }).populate("seat_type");

    // console.log("====================================");
    // console.log(seatDocuments);
    // console.log("====================================");

    if (seatDocuments.length !== seats.length) {
      return res.status(400).json({
        message:
          "Some seats are invalid or do not belong to the room for this show.",
      });
    }

    // Calculate total price of the selected seats
    const calculatedTotalPrice = seatDocuments.reduce(
      (sum, seat) => sum + seat["seat_type"].price,
      0
    );

    // Compare with the provided total_price
    if (calculatedTotalPrice !== total_price) {
      return res.status(400).json({
        message: `Price mismatch. Expected total: ${calculatedTotalPrice}, provided: ${total_price}.`,
      });
    }

    // Check if any of the seats are already booked
    const existingBookings = await BookingModel.find({
      show_id,
      status: "confirmed",
    });

    const bookedSeats = new Set(
      existingBookings.flatMap((booking) => booking.seats)
    );

    const unavailableSeats = seats.filter((seat) => bookedSeats.has(seat));
    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: "Some seats are already booked.",
        unavailableSeats,
      });
    }

    // Create the booking
    const newBooking = new BookingModel({
      user_id,
      show_id,
      seats,
      total_price,
      status: "pending",
    });

    const savedBooking = await newBooking.save();

    // Respond with the created booking
    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

//TODO: Create payment intent for Stripe
const create_intent_payment = async (req, res) => {
  try {
    const { booking_id, user_id, amount } = req.body;

    // Validate the incoming request
    if (!booking_id || !user_id || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const booking = await BookingModel.findById(booking_id);

    if (!booking) {
      return res
        .status(400)
        .json({ success: false, message: "Can't find booking for payment" });
    }

    if (booking.status === "confirmed") {
      return res
        .status(400)
        .json({ success: false, message: "Booking already success" });
    }

    if (booking.total_price !== amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount payment conflict" });
    }

    // Create a payment record in the database
    const newPayment = await PaymentModel.create({
      booking_id,
      user_id,
      amount,
      payment_status: "pending",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "jpy",
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);

    return res
      .status(201)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

// Update payment and booking status
const updatePaymentAndBookingStatus = async (req, res, next) => {
  try {
    const { paymentStatus, bookingStatus, bookingId } = req.body; // Updated statuses

    // Validate input
    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }
    if (!paymentStatus && !bookingStatus) {
      return res.status(400).json({
        success: false,
        message:
          "At least one of paymentStatus or bookingStatus must be provided",
      });
    }

    // Find the booking
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Update the booking status if provided
    if (bookingStatus) {
      booking.status = bookingStatus;
      await booking.save();
    }

    // Find and update the payment related to the booking
    const payment = await PaymentModel.findOne({ booking_id: bookingId });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found for this booking",
      });
    }

    payment.payment_status = paymentStatus;
    await payment.save();

    const paymentSaved = await PaymentModel.findOne({
      booking_id: bookingId,
    });

    //* Send email if payment status is successful
    if (paymentSaved.payment_status === "successful") {
      await sendPaymentConfirmationEmail(booking);
    }

    // Response with the updated booking and payment details
    res.status(200).json({
      success: true,
      message: "Booking and payment statuses updated successfully",
      data: {
        booking,
        payment,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookingInformation,
  getBookingInformationById,
  createBooking,
  getPaymentInfo,
  create_intent_payment,
  updatePaymentAndBookingStatus,
  getAllBookingsWithDetails,
};
