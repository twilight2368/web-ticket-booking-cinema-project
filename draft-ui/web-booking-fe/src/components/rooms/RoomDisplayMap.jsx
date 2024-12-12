import { useEffect, useState } from "react";
import SeatMap from "./SeatMap";
import DayDisplay from "../time/DayDisplay";
import TimeDisplay from "../time/TimeDisplay";

export default function RoomDisplayMap({ room_status, show_details, movie }) {
  const [roomDetails, setRoomDetails] = useState();
  const [seatsMap, setSeatsMap] = useState();
  useEffect(() => {
    //Extract room data only not the seats
    const { seats, ...room_detail } = room_status;
    setRoomDetails(room_detail);
    setSeatsMap(seats);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full text-center pt-12">
        <h3 className="text-xl font-black">
          Phòng chiếu phim: <span>{room_status.name}</span>
        </h3>
      </div>
      <div className="w-full text-center pt-2 pb-12">
        <span className="">
          <span>
            <DayDisplay isoDate={show_details.time_start} />
          </span>
          <span> - </span>
          <TimeDisplay isoDate={show_details.time_start} />
        </span>{" "}
      </div>
      <div className="h-12 w-2/3 mx-auto flex justify-between items-center mb-6">
        <div className="w-1/3 flex flex-row gap-2 justify-center items-center">
          <span className="text-xs text-gray-500"> Cửa thoát hiểm </span>
        </div>
        <div className="text-xs text-gray-500 italic">
          <span>(màn hình)</span>
        </div>
        <div className="w-1/3 flex flex-row gap-2 justify-center items-center">
          <span className="text-xs text-gray-500"> Cửa ra vào </span>
        </div>
      </div>
      <div className=" min-h-96 w-full mb-24">
        {roomDetails && seatsMap ? (
          <SeatMap
            movie_data={movie}
            room_data={roomDetails}
            show_data={show_details}
            SeatsData={seatsMap}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
