const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const PaymentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },
    booking_id: {
      type: String,
      ref: "booking", // Reference to the booking for which the payment was made
      required: true,
    },
    user_id: {
      type: String,
      ref: "user",
    },
    payment_method: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    amount: {
      type: Number,
      required: true, // The amount paid
    },
    payment_status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending", // Default payment status is pending
    },
    transaction_id: {
      type: String,
      unique: true, // Transaction ID should be unique
    },
    payment_time: {
      type: Date,
      default: Date.now, // Automatically set the payment date
    },
    payment_details: {
      type: String, // Optional field for storing payment-related details (e.g., payer name or gateway reference)
    },
  },
  { timestamps: true }
);

// Add an index to optimize queries by booking_id and payment_status
PaymentSchema.index({ booking_id: 1, payment_status: 1 });

const PaymentModel = mongoose.model("Payment", PaymentSchema);

module.exports = PaymentModel;
