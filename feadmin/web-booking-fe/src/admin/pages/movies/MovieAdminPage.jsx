import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Đảm bảo rằng bạn đang sử dụng 'react-router-dom'
import UpdateImageModal from "../../components/UpdateImageModal";
import { UpdateMovieModal } from "./UpdateMovieModal";
import DayDisplay from "../../components/time/DayDisplay";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MovieAdminPage() {
  const [movieList, setMovieList] = useState([]); // Khởi tạo mặc định là mảng rỗng

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/movies`)
      .then((response) => {
        // Kiểm tra nếu dữ liệu trả về là mảng
        if (Array.isArray(response.data)) {
          setMovieList(response.data);
        } else {
          toast.error("Dữ liệu trả về không phải mảng.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Lỗi khi tải dữ liệu phim");
      });
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      {/* Page Header */}
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý phim
      </div>

      {/* Add Movie Button */}
      <div className="w-full flex justify-center mb-8">
        <Link to="add">
          <Button color="blue">Thêm phim</Button>
        </Link>
      </div>

      {/* Movie List Table */}
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 bg-white shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Tên phim
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Thời lượng (phút)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Ngày phát hành
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movieList) && movieList.length > 0 ? (
                movieList.map((movie) => (
                  <MovieDisplayItem
                    key={movie._id}
                    movie_id={movie._id}
                    title={movie.title}
                    durations={movie.duration_in_minutes}
                    release_date={movie.release_date}
                    movie={movie}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Không có phim nào để hiển thị
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MovieDisplayItem = ({ movie_id, title, durations, release_date, movie }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 w-96 truncate">
        <div className="w-96 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {durations}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <DayDisplay isoDate={release_date} />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center flex justify-center items-center gap-2">
        <Link to={`/movies/${movie_id}`}>
          <Button color="green" size="sm">
            Chi tiết
          </Button>
        </Link>
        <div>
          <UpdateMovieModal movie={movie} />
        </div>
        <div>
          <UpdateImageModal movie_id={movie_id} display_text="thay đổi poster" />
        </div>
      </td>
    </tr>
  );
};
