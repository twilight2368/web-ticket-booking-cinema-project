const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const BookingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
  },
});

const BookModel = mongoose.model("booking", BookingSchema);

export default BookModel;
