const Stripe = require("stripe");
const BookingModel = require("../../models/database/Booking");
const PaymentModel = require("../../models/database/Payment");

//TODO: Get all booking information
const getBookingInformation = async (req, res, next) => {};

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

const stripe = Stripe();
//TODO: Create a payment
const createPayment = async (req, res, next) => {
  try {
    // const { booking_id, user_id, payment_method, amount, payment_details } =
    const { booking_id, user_id, payment_method, amount } = req.body;

    const newPayment = await PaymentModel.create({
      booking_id,
      user_id,
      payment_method,
      amount,
      payment_status: "pending", // Default status
      //transaction_id: transactionId,
      //payment_details,
    });

    res.status(201).json({ success: true, data: newPayment });
  } catch (error) {
    console.error("Error creating payment: ", error);
    next(error); // Pass the error to middleware
  }
};

const create_intendent = async (req, res) => {
  try {
    console.log(req.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  create_intendent,
  getPaymentInfo,
};
