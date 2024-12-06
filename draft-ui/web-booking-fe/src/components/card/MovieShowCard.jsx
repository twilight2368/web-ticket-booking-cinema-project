import { Card, CardBody } from "@material-tailwind/react";
import MovieScheduleLink from "../button/MovieScheduleLink";
import { Link } from "react-router";

export default function MovieShowCard() {
  return (
    <div className="w-full">
      <Card className=" border-[1px] border-blue-gray-600 bg-black ">
        <CardBody className="p-0">
          <div className="w-full flex flex-col sm:flex-row border-b-[1px] border-dashed border-blue-gray-600">
            <div className="sm:w-1/3 h-full w-full ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN728ej8GWQRnt-6G3eFJLMN9ZMxrkg_UkCQ&s"
                alt=""
                className="h-full w-full object-cover rounded-tl-xl rounded-tr-xl sm:rounded-tr-none"
              />
            </div>
            <div className="sm:w-2/3 sm:h-full w-full p-3 text-white ">
              <div className="w-full text-xl font-bold mb-2">
                <p className=" line-clamp-2">
                  <Link to="/movies/1" className=" hover:underline">
                    Princess Mononoke
                  </Link>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full font-thin ">
                  <p className=" line-clamp-2">
                    <span>Thể loại: </span>
                    <span>Lorem ipsum dolor sit amet consectetur,</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Thời lượng: </span>
                    <span className=" font-black">100 phút</span>
                  </p>
                </div>
                <div className="w-full  font-thin">
                  <p className=" line-clamp-2">
                    <span>Diễn viên: </span>
                    <span>Lorem ipsum dolor sit amet consectetur,</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Đạo diễn: </span>
                    <span>Lorem ipsum dolor sit amet consectetur,</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Xuất xứ: </span>
                    <span>Lorem ipsum dolor sit amet consectetur,</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Khởi chiếu: </span>
                    <span>01/01/2024</span>
                  </p>
                </div>
                <div className="w-full font-bold text-lg  text-red-600 mt-1">
                  <p className=" truncate">
                    <span>PG: </span>
                    <span className=" px-2 rounded-md border-2 border-red-400">
                      ...
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" min-h-32 mt-4 mb-8">
            <div className=" w-full text-center font-bold text-xl text-white mb-3 ">
              <span>Lịch chiếu</span>
            </div>
            <div className="w-full px-8 py-2 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-3 text-center">
              <MovieScheduleLink to={"id?showID=showid"} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
