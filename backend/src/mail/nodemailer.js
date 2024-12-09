const appConfig = require("../configs/app.config");
const nodemailer = require("nodemailer");
const BookingModel = require("../models/database/Booking");
const UserModel = require("../models/database/User");
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: appConfig.nodemailer.auth.user,
    pass: appConfig.nodemailer.auth.pass,
  },
});
// Helper function to send confirmation email
const sendPaymentConfirmationEmail = async (booking) => {
  try {
    // Data for QR code
    const qrData = `${appConfig.client_url}/booking/${booking.id}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      qrData
    )}`;

    // Fetch additional booking details
    const fullBooking = await BookingModel.findById(booking._id);

    const user = await UserModel.findById(fullBooking.user_id);

    if (!user) {
      return;
    }

    const mailOptions = {
      from: appConfig.nodemailer.email_from,
      to: user.email,
      subject: "Payment Confirmation - Movie Ticket",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Xác Nhận Thanh Toán - Vé Xem Phim</h2>
          <p>Kính chào ${user.username},</p>
          <p>Thanh toán của bạn cho vé xem phim đã được xử lý thành công.</p>    
          <div style="text-align: center; margin-top: 20px;">
          <h4>Mã QR Vé Của Bạn</h4>
          <img src="${qrCodeUrl}" alt="Mã QR Vé" style="max-width: 200px;"/></div>
          <p>Chúc bạn có những phút giây giải trí tuyệt vời.</p>
        </div>
      `,
    };

    // Send email
    // Add email sending timeout
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email send timeout")), 10000)
      ),
    ]);

    console.log(`Payment confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

module.exports = sendPaymentConfirmationEmail;
