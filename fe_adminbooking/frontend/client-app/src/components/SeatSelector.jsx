import React, { useState } from "react";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const cols = 18;

const SeatSelector = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="seat-selector">
      {rows.map((row) => (
        <div key={row} className="seat-row">
          {[...Array(cols)].map((_, index) => {
            const seat = `${row}${index + 1}`;
            return (
              <button
                key={seat}
                className={`seat ${
                  selectedSeats.includes(seat) ? "selected" : ""
                }`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
