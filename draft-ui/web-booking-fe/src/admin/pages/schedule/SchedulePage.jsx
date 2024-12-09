import { Button } from "@material-tailwind/react";
import { AddScheduleModal } from "./AddScheduleModal";

export default function SchedulePage() {
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
              <ScheduleDisplayItem
                name_room={"Room-n"}
                name_movie={"Hello world i am from Ghibli"}
                day={"2024-12-01"}
                time_start={"10:00"}
                time_end={"12:00"}
              />
              <ScheduleDisplayItem
                name_room={"Room-n"}
                name_movie={"Hello world i am from Ghibli"}
                day={"2024-12-01"}
                time_start={"10:00"}
                time_end={"12:00"}
              />
              <ScheduleDisplayItem
                name_room={"Room-n"}
                name_movie={"Hello world i am from Ghibli"}
                day={"2024-12-01"}
                time_start={"10:00"}
                time_end={"12:00"}
              />
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
      <td className="border border-gray-300 px-4 py-2 text-center">{day}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {time_start} - {time_end}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Button color="red" variant="outlined">
          xóa
        </Button>
      </td>
    </tr>
  );
};
