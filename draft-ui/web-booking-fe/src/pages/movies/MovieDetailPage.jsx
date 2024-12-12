import { Button } from "@material-tailwind/react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import MovieDescriptionModal from "../../components/modals/MovieDescriptionModal";
import TrailerPlayerModal from "../../components/modals/TrailerPlayerModal";
import MovieScheduleLink from "../../components/button/MovieScheduleLink";
import RoomDisplayMap from "../../components/rooms/RoomDisplayMap";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DayDisplay from "../../components/time/DayDisplay";
import { parse } from "date-fns";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MovieLayout() {
  const [data, setData] = useState(null);
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState(null);
  const [dayList, setDayList] = useState([]);
  const [chosenDayList, setChosenDayList] = useState(0);
  const [showRoomStatus, setShowRoomStatus] = useState();

  const { id } = useParams();
  // Get search params object
  const [searchParams] = useSearchParams();
  // Retrieve the 'query' parameter from the URL
  const showID = searchParams.get("showID");

  useEffect(() => {
    console.log("====================================");
    console.log(showID, id);
    console.log("====================================");
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/show-movie-days/${id}`)
      .then((response) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        setData(response.data.data);
        setMovie(response.data.data.movie);
        const newDayList = Object.keys(response.data.data.shows);
        const sortedDates = newDayList.sort((a, b) => {
          const dateA = parse(a, "dd-MM-yyyy", new Date());
          const dateB = parse(b, "dd-MM-yyyy", new Date());
          return dateA - dateB; // Sorts in ascending order
        });
        setDayList(sortedDates);
        setShows(response.data.data.shows);
      })
      .catch((error) => {
        toast.error("Something went wrong!!!");
      });
  }, []);

  useEffect(() => {
    if (showID) {
      axios
        .get(`${BASE_URL}/api/rooms/${showID}`)
        .then((response) => {
          setShowRoomStatus(response.data);
        })
        .catch((error) => {
          toast.error("Something went wrong!!!");
        });
    }
  }, [showID]);

  return (
    <div className="w-full">
      {data ? (
        <>
          {" "}
          <div className=" relative w-full md:h-[500px] h-[1200px]">
            <div className=" w-full h-full">
              <img
                src={movie.image_url}
                alt="image-background"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className=" absolute top-0 w-full h-full bg-gradient-to-b from-black/45 to-black/80 z-10 md:px-24 px-6 ">
              <div className=" w-full h-full padding-for-header flex justify-center items-center">
                <div className="flex md:flex-row flex-col w-4/5 h-full p-6">
                  <div className="md:w-1/3 w-full flex justify-center items-center">
                    <img
                      src={movie.image_url}
                      alt="image"
                      className="h-full aspect-[2/3] object-cover object-center"
                    />
                  </div>
                  <div className="md:w-2/3 w-full overflow-auto">
                    <div className="w-full p-3 text-white">
                      <div className="w-full text-2xl font-bold mb-2">
                        <p className=" line-clamp-3">{movie.title}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="w-full font-thin ">
                          <p className=" line-clamp-2">
                            <span>Thể loại: </span>
                            <span>{movie.genre}</span>
                          </p>
                        </div>
                        <div className="w-full font-bold">
                          <p className=" truncate">
                            <span>Thời lượng: </span>
                            <span>{movie.duration_in_minutes} phút</span>
                          </p>
                        </div>
                        <div className="w-full  font-thin">
                          <p className=" line-clamp-2">
                            <span>Diễn viên: </span>
                            <span>{movie.actors}</span>
                          </p>
                        </div>
                        <div className="w-full font-thin">
                          <p className=" truncate">
                            <span>Đạo diễn: </span>
                            <span>{movie.director}</span>
                          </p>
                        </div>
                        <div className="w-full font-thin">
                          <p className=" truncate">
                            <span>Xuất xứ: </span>
                            <span>{movie.country}</span>
                          </p>
                        </div>
                        <div className="w-full font-thin">
                          <p className=" truncate">
                            <span>Khởi chiếu: </span>
                            <span>
                              <DayDisplay isoDate={movie.release_date} />
                            </span>
                          </p>
                        </div>
                        <div className="w-full font-bold text-lg  text-red-600 mt-1 mb-2">
                          <p className=" truncate">
                            <span>PG: </span>
                            <span className=" px-2 rounded-md border-2 border-red-400">
                              {movie.parental_guidance}
                            </span>
                          </p>
                        </div>
                        <div className=" flex sm:flex-row flex-col gap-2">
                          <MovieDescriptionModal
                            description={movie.description}
                          />
                          <TrailerPlayerModal trailer_url={movie.trailer_url} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-20 bg-black">
            <div className=" w-full h-full flex flex-row justify-center md:gap-6 gap-3 items-center mb-6">
              {dayList.length && !showID ? (
                <>
                  {dayList.map((day, i) => {
                    return (
                      <Button
                        key={i}
                        variant={i === chosenDayList ? "filled" : "outlined"}
                        color="white"
                        onClick={() => {
                          setChosenDayList(i);
                        }}
                        disabled={showID ? true : false}
                      >
                        {day}
                      </Button>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {dayList.length ? (
            <div className="min-h-96">
              {showID ? (
                <>
                  {showRoomStatus ? (
                    <>
                      {/* !NOTE: IT MUST REQUIRE THE DATA */}
                      <RoomDisplayMap
                        room_status={showRoomStatus.room}
                        show_details={showRoomStatus.show_details}
                        movie={movie}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <div className=" lg:px-36 sm:px-12">
                    <div className="w-full  pt-12 grid md:grid-cols-4 sm:grid-cols-2 gap-6 text-center">
                      {shows[dayList[chosenDayList]].map((show, i) => {
                        return (
                          <MovieScheduleLink
                            key={i}
                            name={i + 1}
                            to={`?showID=${show._id}`}
                            time={show.time_start}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
