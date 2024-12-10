import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import DayDisplay from "../../../components/time/DayDisplay";
import TimeDisplay from "../../../components/time/TimeDisplay";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/all-news`)
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        toast.error("Failed to get all news");
      });
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      {" "}
      {/* Page Header */}
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý tin tức
      </div>
      {/* Add News Button */}
      <div className="w-full flex justify-center mb-8">
        <Link to="add">
          <Button color="blue">Thêm tin tức</Button>
        </Link>
      </div>
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 bg-white shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  tiêu đề
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  ngày viết
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {newsList ? (
                <>
                  {newsList.map((news) => {
                    return (
                      <NewsDisplayItem
                        title={news.title}
                        date={news.write_at}
                        key={news._id}
                        id={news._id}
                      />
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

const NewsDisplayItem = ({ id, title, date }) => {
  const admin = useSelector((state) => state.admin);

  const deleteNew = async () => {
    axios
      .delete(`${BASE_URL}/api/news/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bear ${admin.admin.jwt}`,
        },
      })
      .then((response) => {
        toast.success("Delete success");
      })
      .catch((error) => {
        toast.error("Delete faile");
      });
  };

  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 truncate">
        <div className="w-96 overflow-hidden whitespace-nowrap text-ellipsis">
          <Link to={`/news/${id}`} className=" hover:underline">
            {title}
          </Link>
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2  truncate">
        <div className=" overflow-hidden text-center whitespace-nowrap text-ellipsis">
          <DayDisplay isoDate={date} /> <span>-</span>
          <TimeDisplay isoDate={date} />
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Button color="red" variant="outlined" onClick={deleteNew}>
          xóa
        </Button>
      </td>
    </tr>
  );
};
