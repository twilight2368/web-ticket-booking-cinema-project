import React from "react";

const Header = () => {
  return (
    <div className="header">
      <h1>Moana 2</h1>
      <p>Thời lượng: 99 phút | Đạo diễn: David G. Derrick Jr.</p>
      <div className="date-tabs">
        <button className="tab">Thứ 2</button>
        <button className="tab">Thứ 3</button>
        {/* Các ngày khác */}
      </div>
    </div>
  );
};

export default Header;
