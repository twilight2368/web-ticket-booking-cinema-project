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

//TODO: Get bill information
const getBillInfo = async (req, res, next) => {
  try {
    const bookingId = req.params.booking_id; // Booking ID from request parameters
    const payment = await PaymentModel.findOne({ booking_id: bookingId }); // Find payment by booking_id

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching bill information: ", error);
    next(error); // Pass the error to middleware
  }
};

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
