const Stripe = require("stripe");
const Booking = require("../../models/database/Booking");
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
