import classNames from "classnames";

export default function SeatMapAdmin({ fakeSeatsData }) {
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
      <div>
        <div className="h-12 w-full mx-auto flex justify-between items-center mb-6">
          <div className="w-1/6 flex flex-row gap-2 justify-center items-center">
            <span className="text-xs text-gray-500"> Cửa thoát hiểm </span>
          </div>
          <div className="text-xs text-gray-500 italic">
            <span>(màn hình)</span>
          </div>
          <div className="w-1/6 flex flex-row gap-2 justify-center items-center">
            <span className="text-xs text-gray-500"> Cửa ra vào </span>
          </div>
        </div>
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
                        <SeatDisplayItem key={seat._id} seat={seat} />
                      </>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Individual Seat Component
function SeatDisplayItem({ seat }) {
  return (
    <div
      className={classNames(
        "md:w-12 md:h-12 h-6 w-6 rounded-md flex justify-center items-center text-white",
        {
          "bg-yellow-800": seat.seat_type === "Vip",
          "bg-blue-gray-400 ": seat.seat_type !== "Vip",
        }
      )}
    >
      <span className=" text-xs sm:hidden hidden md:block lg:block ">
        {seat.seat_row}-{seat.seat_column}
      </span>
    </div>
  );
}
