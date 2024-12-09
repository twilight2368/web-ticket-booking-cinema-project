import { Button } from "@material-tailwind/react";
import { Link } from "react-router";

export default function AdminNewsPage() {
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
              <NewsDisplayItem
                title={"Hello world i am from Ghibli"}
                date={"2024-12-01"}
              />
              <NewsDisplayItem
                title={"Hello world i am from Ghibli"}
                date={"2024-12-01"}
              />
              <NewsDisplayItem
                title={"Hello world i am from Ghibli"}
                date={"2024-12-01"}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const NewsDisplayItem = ({ id, title, date }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 truncate">
        <div className="w-96 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2  truncate">
        <div className=" overflow-hidden text-center whitespace-nowrap text-ellipsis">
          {date}
        </div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Button color="red" variant="outlined">
          xóa
        </Button>
      </td>
    </tr>
  );
};
