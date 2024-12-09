const appConfig = require("../configs/app.config");
const sendPaymentConfirmationEmail = require("../mail/nodemailer");
const stripe = require("stripe")(appConfig.stripe.private_key);
const BookingModel = require("../models/database/Booking");
const PaymentModel = require("../models/database/Payment");

//TODO: Get all booking information
const getBookingInformation = async (req, res, next) => {
  try {
    const bookings = await BookingModel.find(); // Replace with appropriate DB query for your use case
    res.status(200).json({ success: true, data: bookings });
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

    const booking = await BookingModel.findById(id); // Replace with your DB's query method
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
    if (!user_id || !show_id || !seats || !seats.length || !total_price) {
      return res.status(400).json({
        message:
          "Missing required fields: user_id, show_id, seats, or total_price.",
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
    });

    if (seatDocuments.length !== seats.length) {
      return res.status(400).json({
        message:
          "Some seats are invalid or do not belong to the room for this show.",
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
    const { booking_id, user_id, payment_method, amount } = req.body;

    // Validate the incoming request
    if (!booking_id || !user_id || !payment_method || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
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
      .status(200)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

// Update payment and booking status
const updatePaymentAndBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params; // Booking ID from the request params
    const { paymentStatus, bookingStatus } = req.body; // Updated statuses

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

    if (paymentStatus) {
      payment.payment_status = paymentStatus;
      await payment.save();
    }

    if (paymentStatus) {
      payment.payment_status = paymentStatus;
      await payment.save();

      const paymentSaved = await PaymentModel.findOne({
        booking_id: bookingId,
      });
      //* Send email if payment status is successful
      if (paymentSaved.status === "successful") {
        await sendPaymentConfirmationEmail(booking);
      }
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
};
