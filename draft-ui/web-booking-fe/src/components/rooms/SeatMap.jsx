import { Button, Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import classNames from "classnames";

import { XMarkIcon } from "@heroicons/react/24/outline";
// Fake room data matching the schema
const fakeRoomData = {
  _id: "room-123",
  name: "Cinema Room 1",
  total_seats: 100,
  num_of_rows: 5,
  num_of_cols: 10,
};

// Fake seats data matching the schema
const fakeSeatsData = [
  ...Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => ({
      _id: `seat-${rowIndex + 1}-${colIndex + 1}`,
      room_id: "room-123",
      seat_row: rowIndex + 1,
      seat_column: colIndex + 1,
      seat_type: rowIndex < 2 ? "Vip" : "Normal",
    }))
  ).flat(),
];

// Individual Seat Component
const SeatDisplay = ({ seat, isReserved, isSelected, onSelect }) => {
  return (
    <button
      className={classNames(
        "md:w-12 md:h-12 h-8 w-8 m-1 rounded-md flex justify-center items-center",
        {
          "bg-gray-900 cursor-not-allowed": isReserved,
          "bg-blue-400": isSelected,
          "bg-yellow-800": !isSelected && seat.seat_type === "Vip",
          "bg-blue-gray-400 ": !isSelected && seat.seat_type !== "Vip",
          "hover:opacity-80 cursor-pointer": !isReserved,
        }
      )}
      disabled={isReserved}
      onClick={() => onSelect(seat)}
    >
      {isReserved ? (
        <XMarkIcon strokeWidth={6} className=" h-6 w-6 text-blue-gray-800" />
      ) : (
        <span className=" text-xs sm:hidden hidden md:block lg:block ">
          {seat.seat_column}-{seat.seat_row}
        </span>
      )}
    </button>
  );
};

// Seat Map Component
export default function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Handle seat selection
  const handleSeatSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.some((s) => s._id === seat._id)
        ? prev.filter((s) => s._id !== seat._id)
        : [...prev, seat]
    );
  };

  // Organize seats by row
  const getSeatsByRow = () => {
    const seatsByRow = {};
    fakeSeatsData.forEach((seat) => {
      if (!seatsByRow[seat.seat_row]) {
        seatsByRow[seat.seat_row] = [];
      }
      seatsByRow[seat.seat_row].push(seat);
    });

    return seatsByRow;
  };

  const seatsByRow = getSeatsByRow();

  return (
    <>
      <div className="flex flex-col items-center space-y-4 mb-12">
        <div className="flex flex-col">
          {Object.keys(seatsByRow).map((rowNumber) => (
            <div key={rowNumber} className="flex">
              {seatsByRow[rowNumber]
                .sort((a, b) => a.seat_column - b.seat_column)
                .map((seat) => (
                  <SeatDisplay
                    key={seat._id}
                    seat={seat}
                    isReserved={seat.seat_row > 5}
                    isSelected={selectedSeats.some((s) => s._id === seat._id)}
                    onSelect={handleSeatSelect}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* Seat Legend */}
      <div className="flex space-x-4 mb-4 justify-center items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-gray-400 rounded-md"></div>
          <span>Ghế thường</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-yellow-800 rounded-md"></div>
          <span>Ghế VIP</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-400 rounded-md"></div>
          <span>Ghế đã chọn</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-900 rounded-md flex justify-center items-center">
            <XMarkIcon strokeWidth={6} className="h-4 w-4 text-blue-gray-800" />
          </div>
          <span>Ghế được đặt trước</span>
        </div>
      </div>
      {/* Selected Seats Display */}
      <div className="mt-12 px-16">
        <Card className=" bg-gray-900 shadow-md shadow-black">
          <CardBody className=" text-white text-lg p-8">
            <p className="px-6">
              <span>Selected Seats: </span>
              {selectedSeats
                .map((seat) => `R${seat.seat_row}C${seat.seat_column}`)
                .join(", ")}
            </p>
            <div className=" border-t border-dashed m-6 border-blue-gray-800"></div>
            <p className=" text-right px-6 after:content-['vnd']">
              Total:{" "}
              {selectedSeats.reduce((total, seat) => {
                return total + (seat.seat_type === "Vip" ? 60000 : 50000);
              }, 0)}{" "}
            </p>
            <div className="w-full flex justify-end items-center">
                <Button>Next</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
