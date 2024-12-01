import React from "react";

const Footer = ({ totalPrice, onConfirm }) => {
  return (
    <div className="footer">
      <p>Tổng tiền: {totalPrice}đ</p>
      <button className="confirm-button" onClick={onConfirm}>
        Thanh toán
      </button>
    </div>
  );
};

export default Footer;
