import { Button, Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import SeatDisplay from "./SeatDisplay";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
// Seat Map Component
export default function SeatMap({ fakeRoomData, fakeSeatsData }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Check if a seat is adjacent to any of the selected seats
  const isAdjacent = (seat) => {
    for (let selectedSeat of selectedSeats) {
      // Same row and adjacent column
      if (
        selectedSeat.seat_row === seat.seat_row &&
        Math.abs(selectedSeat.seat_column - seat.seat_column) === 1
      ) {
        return true;
      }
      // Adjacent row and same column
      if (
        Math.abs(selectedSeat.seat_row - seat.seat_row) === 1 &&
        selectedSeat.seat_column === seat.seat_column
      ) {
        return true;
      }
    }
    return false;
  };

  // Handle seat selection
  const handleSeatSelect = (seat) => {
    if (selectedSeats.some((s) => s._id === seat._id)) {
      setSelectedSeats((prev) => prev.filter((s) => s._id !== seat._id));
    } else {
      // Only allow selection if it's adjacent to a selected seat or if there are no selected seats
      if (selectedSeats.length === 0 || isAdjacent(seat)) {
        setSelectedSeats((prev) => [...prev, seat]);
      } else {
        toast.error(
          " Mua ghế tạo ghế trống.\n Quý khách nên chọn ghế bên cạnh ",
          {
            position: "bottom-center",
          }
        );
      }
    }
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
        <div className="flex flex-col space-y-2">
          {Object.keys(seatsByRow).map((rowNumber) => (
            <div
              key={rowNumber}
              className="flex w-full justify-center items-center gap-2"
            >
              {seatsByRow[rowNumber]
                .sort((a, b) => a.seat_column - b.seat_column)
                .map((seat) => {
                  return (
                    <>
                      <SeatDisplay
                        key={seat._id}
                        seat={seat}
                        isReserved={seat.seat_row > 5}
                        isSelected={selectedSeats.some(
                          (s) => s._id === seat._id
                        )}
                        onSelect={handleSeatSelect}
                      />
                    </>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Seat Legend */}
      <div className="flex sm:space-x-4 sm:space-y-0 space-y-4 mb-4 sm:flex-row flex-col justify-center items-center">
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
            <div className="w-full p-6 flex justify-end items-center">
              <Button className="" color="red" variant="gradient">
                thanh toán
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
