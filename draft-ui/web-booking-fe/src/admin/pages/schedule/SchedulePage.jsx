import { Button } from "@material-tailwind/react";
import { AddScheduleModal } from "./AddScheduleModal";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DayDisplay from "../../../components/time/DayDisplay";
import TimeDisplay from "../../../components/time/TimeDisplay";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function SchedulePage() {
  const [showList, setShowList] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/all-shows`)
      .then((response) => {
        setShowList(response.data);
        //toast.success("Get all shows data successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Get all shows data failed");
      });
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      {/* Page Header */}
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý lịch chiếu phim
      </div>

      {/* Add Schedule Button */}
      <div className="w-full flex justify-center mb-8">
        <AddScheduleModal />
      </div>

      {/* Movie List Table */}
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 bg-white shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Tên phòng
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tên phim
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  ngày
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  bắt đầu - kết thúc
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {showList ? (
                <>
                  {" "}
                  {showList.map((show) => {
                    return (
                      <>
                        <ScheduleDisplayItem
                          name_room={show.room_id.name}
                          name_movie={show.movie_id.title}
                          day={show.date_show}
                          time_start={show.time_start}
                          time_end={show.time_end}
                        />
                      </>
                    );
                  })}{" "}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ScheduleDisplayItem = ({
  name_room,
  name_movie,
  day,
  time_start,
  time_end,
}) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 w-24 truncate">
        <div className="w-24 overflow-hidden whitespace-nowrap text-ellipsis">
          {name_room}
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2 w-60 truncate">
        <div className="w-52 overflow-hidden whitespace-nowrap text-ellipsis">
          {name_movie}
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <DayDisplay isoDate={day} />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <TimeDisplay isoDate={time_start} /> -
        <TimeDisplay isoDate={time_end} />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Button color="red" variant="outlined">
          xóa
        </Button>
      </td>
    </tr>
  );
};
