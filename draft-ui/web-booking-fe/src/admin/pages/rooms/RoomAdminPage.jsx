import { Button } from "@material-tailwind/react";
import { AddRoomModal } from "./AddRoomModal";
import { RoomMapDisplayModal } from "./RoomMapDisplayModal";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function RoomAdminPage() {
  const [roomList, setRoomList] = useState();

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/api/rooms`)
        .then((response) => {
          setRoomList(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  }, []);
  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      {/* Page Header */}
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý phòng
      </div>

      {/* Add Room Button */}
      <div className="w-full flex justify-center mb-8">
        <AddRoomModal />
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
                  Tổng số ghế
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Hàng - Cột
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {roomList ? (
                <>
                  {roomList.map((room) => {
                    return (
                      <>
                        <RoomDisplayItem
                          name={room.name}
                          total_seat={room.total_seats}
                          cols={room.num_of_cols}
                          rows={room.num_of_rows}
                          seats={room.seats}
                        />
                      </>
                    );
                  })}
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

const RoomDisplayItem = ({ name, total_seat, cols, rows, seats }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 w-96 truncate">
        <div className="w-48 overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {total_seat}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {rows} - {cols}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center flex justify-center items-center gap-2">
        <RoomMapDisplayModal seats={seats} />
      </td>
    </tr>
  );
};
