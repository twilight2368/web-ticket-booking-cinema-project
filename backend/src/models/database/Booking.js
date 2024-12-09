const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const BookingSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },
    user_id: {
      type: String,
      ref: "user",
    },
    show_id: {
      type: String,
      ref: "show",
    },
    seats: [
      {
        type: String, // Reference to the seat model or seat ID
        ref: "seat",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending", // Default status is pending
    },
    total_price: {
      type: Number,
      required: true, // Total price of the booking
    },
    booking_time: {
      type: Date,
      default: Date.now, // Date when the booking was created
    },
  },
  { timestamps: true }
);

// Add an index to optimize lookups
BookingSchema.index({ user_id: 1, show_id: 1 });

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
