import SeatMap from "./SeatMap";

// Fake room data matching the schema
const fakeRoomData = {
  _id: "room-123",
  name: "Phòng chiếu phim 1",
  total_seats: 100,
  num_of_rows: 5,
  num_of_cols: 10,
};

// Fake seats data matching the schema
const fakeSeatsData = [
  ...Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => ({
      _id: `seat-${rowIndex + 1}-${colIndex + 1}`,
      room_id: "room-123",
      seat_row: rowIndex + 1,
      seat_column: colIndex + 1,
      seat_type: rowIndex < 2 ? "Vip" : "Normal",
    }))
  ).flat(),
];

export default function RoomDisplayMap() {
  return (
    <div className="w-full">
      <div className="w-full text-center p-6">
        <h3 className="text-xl font-black">{fakeRoomData.name}</h3>
      </div>
      <div className="h-12 w-1/2 mx-auto flex justify-between items-center mb-6">
        <div className="w-1/6 flex flex-row gap-2 justify-center items-center">
          <span className="text-xs text-gray-500"> Exit </span>
        </div>
        <div className="text-xs text-gray-500 italic">
          <span>(screen)</span>
        </div>
        <div className="w-1/6 flex flex-row gap-2 justify-center items-center">
          <span className="text-xs text-gray-500"> Entrance </span>
        </div>
      </div>
      <div className=" min-h-96 w-full mb-24">
        <SeatMap fakeRoomData={fakeRoomData} fakeSeatsData={fakeSeatsData} />
      </div>
    </div>
  );
}
