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
    amount: {
      type: Number,
      required: true, // The amount paid
    },
    payment_status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending", // Default payment status is pending
    },
  },
  { timestamps: true }
);

// Add an index to optimize queries by booking_id and payment_status
PaymentSchema.index({ booking_id: 1, payment_status: 1 });

const PaymentModel = mongoose.model("payment", PaymentSchema);

module.exports = PaymentModel;
