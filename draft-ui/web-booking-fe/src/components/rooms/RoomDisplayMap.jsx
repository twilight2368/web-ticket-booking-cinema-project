import SeatMap from "./SeatMap";

export default function RoomDisplayMap() {
  return (
    <div className="w-full">
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
        <SeatMap />
      </div>
    </div>
  );
}
