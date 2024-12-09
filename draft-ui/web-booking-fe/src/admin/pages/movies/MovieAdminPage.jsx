import { Button } from "@material-tailwind/react";
import { Link } from "react-router";
import UpdateImageModal from "../../components/UpdateImageModal";
import { UpdateMovieModal } from "./UpdateMovieModal";

export default function MovieAdminPage() {
  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      {/* Page Header */}
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý phim
      </div>

      {/* Add Movie Button */}
      <div className="w-full flex justify-center mb-8">
        <Link to="add">
          <Button color="blue">
            Thêm phim
          </Button>
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
              <MovieDisplayItem
                movie_id={1}
                title="Hello World"
                durations={120}
                release_date="2023-12-12"
              />
              <MovieDisplayItem
                movie_id={2}
                title="Another Movie"
                durations={90}
                release_date="2024-01-01"
              />
              <MovieDisplayItem
                movie_id={3}
                title="Yet Another Movie"
                durations={150}
                release_date="2024-03-15"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MovieDisplayItem = ({ movie_id, title, durations, release_date }) => {
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
        {release_date}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center flex justify-center items-center gap-2">
        <Link to={`/movies/${movie_id}`}>
          <Button color="green" size="sm">
            Chi tiết
          </Button>
        </Link>
        <div>
          <UpdateMovieModal />
        </div>
        <div>
          <UpdateImageModal display_text="thay đổi poster" />
        </div>
      </td>
    </tr>
  );
};
