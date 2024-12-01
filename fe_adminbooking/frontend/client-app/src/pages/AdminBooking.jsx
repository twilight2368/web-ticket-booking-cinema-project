import React, { useState } from "react";
import Header from "../components/Header";
import SeatSelector from "../components/SeatSelector";
import Footer from "../components/Footer";

const AdminBooking = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleConfirm = () => {
    alert("Đặt vé thành công!");
  };

  return (
    <div className="admin-booking">
      <Header />
      <SeatSelector />
      <Footer totalPrice={totalPrice} onConfirm={handleConfirm} />
    </div>
  );
};

export default AdminBooking;
