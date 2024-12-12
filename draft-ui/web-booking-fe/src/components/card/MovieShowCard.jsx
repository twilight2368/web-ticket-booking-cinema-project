import { Card, CardBody } from "@material-tailwind/react";
import MovieScheduleLink from "../button/MovieScheduleLink";
import { Link } from "react-router";
import DayDisplay from "../time/DayDisplay";

export default function MovieShowCard({
  movie_id,
  title,
  duration_in_minutes,
  genre,
  actors,
  director,
  country,
  release_date,
  parental_guidance,
  image_url,
  shows,
}) {
  return (
    <div className="w-full">
      <Card className=" border-[1px] border-blue-gray-600 bg-black ">
        <CardBody className="p-0">
          <div className="w-full flex flex-col sm:flex-row border-b-[1px] border-dashed border-blue-gray-600">
            <div className="sm:w-1/3 h-full w-full ">
              <img
                src={image_url}
                alt=""
                className="h-full aspect-[2/3] object-cover rounded-tl-xl rounded-tr-xl sm:rounded-tr-none"
              />
            </div>
            <div className="sm:w-2/3 sm:h-full w-full p-3 text-white ">
              <div className="w-full text-xl font-bold mb-2">
                <p className=" line-clamp-2">
                  <Link to={`/movies/${movie_id}`} className=" hover:underline">
                    {title}
                  </Link>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full font-thin ">
                  <p className=" line-clamp-2">
                    <span>Thể loại: </span>
                    <span>{genre}</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Thời lượng: </span>
                    <span className=" font-black">
                      {duration_in_minutes} phút
                    </span>
                  </p>
                </div>
                <div className="w-full  font-thin">
                  <p className=" line-clamp-2">
                    <span>Diễn viên: </span>
                    <span>{actors}</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Đạo diễn: </span>
                    <span>{director}</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Xuất xứ: </span>
                    <span>{country}</span>
                  </p>
                </div>
                <div className="w-full font-thin">
                  <p className=" truncate">
                    <span>Khởi chiếu: </span>
                    <span>
                      <DayDisplay isoDate={release_date} />
                    </span>
                  </p>
                </div>
                <div className="w-full font-bold text-lg  text-red-600 mt-1">
                  <p className=" truncate">
                    <span>PG: </span>
                    <span className=" px-2 rounded-md border-2 border-red-400">
                      {parental_guidance}
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
            <div className="w-full px-8 py-2 grid md:grid-cols-4 sm:grid-cols-2 gap-3 text-center">
              {shows.map((show, i) => {
                return (
                  <>
                    <MovieScheduleLink
                      key={i}
                      name={i + 1}
                      to={`${movie_id}?showID=${show.id}`}
                      time={show.time_start}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
