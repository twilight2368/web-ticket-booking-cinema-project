import { Button, Spinner } from "@material-tailwind/react";
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
  const [showRoomStatus, setShowRoomStatus] = useState(null);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showID = searchParams.get("showID");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/show-movie-days/${id}`)
      .then((response) => {
        const responseData = response.data?.data;
        if (!responseData) {
          toast.error("No data available for this movie.");
          return;
        }

        setData(responseData);
        setMovie(responseData.movie);
        setShows(responseData.shows);

        const newDayList = Object.keys(responseData.shows);
        const sortedDates = newDayList.sort((a, b) => {
          const dateA = parse(a, "dd-MM-yyyy", new Date());
          const dateB = parse(b, "dd-MM-yyyy", new Date());
          return dateA - dateB; // Sorts in ascending order
        });
        setDayList(sortedDates);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch movie data.");
      });
  }, [id]);

  useEffect(() => {
    if (showID) {
      axios
        .get(`${BASE_URL}/api/rooms/${showID}`)
        .then((response) => {
          setShowRoomStatus(response.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to fetch room data.");
        });
    }
  }, [showID]);

  return (
    <div className="w-full">
      {data ? (
        <>
          <div className="relative w-full md:h-[500px] h-[1200px]">
            <div className="w-full h-full">
              <img
                src={
                  movie?.image_url ||
                  "https://res.cloudinary.com/dy2xmyytw/image/upload/v1733622170/82648f28c011896cd0128956e8ebf230_aw3mzu.jpg"
                }
                alt="image-background"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black/45 to-black/80 z-10 md:px-24 px-6">
              <div className="w-full h-full padding-for-header flex justify-center items-center">
                <div className="flex md:flex-row flex-col w-4/5 h-full p-6">
                  <div className="md:w-1/3 w-full flex justify-center items-center">
                    <img
                      src={
                        movie?.image_url ||
                        "https://res.cloudinary.com/dy2xmyytw/image/upload/v1733622170/82648f28c011896cd0128956e8ebf230_aw3mzu.jpg"
                      }
                      alt="image"
                      className="h-full aspect-[2/3] object-cover object-center"
                    />
                  </div>
                  <div className="md:w-2/3 w-full overflow-auto">
                    <div className="w-full p-3 text-white">
                      <div className="w-full text-2xl font-bold mb-2">
                        <p className="line-clamp-3">
                          {movie?.title || "Untitled"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>
                          <strong>Thể loại: </strong>
                          {movie?.genre || "N/A"}
                        </p>
                        <p>
                          <strong>Thời lượng: </strong>
                          {movie?.duration_in_minutes || "Unknown"} phút
                        </p>
                        <p>
                          <strong>Diễn viên: </strong>
                          {movie?.actors || "Not specified"}
                        </p>
                        <p>
                          <strong>Đạo diễn: </strong>
                          {movie?.director || "Unknown"}
                        </p>
                        <p>
                          <strong>Xuất xứ: </strong>
                          {movie?.country || "Unknown"}
                        </p>
                        <p>
                          <strong>Khởi chiếu: </strong>
                          {movie?.release_date ? (
                            <DayDisplay isoDate={movie.release_date} />
                          ) : (
                            "..."
                          )}
                        </p>
                        <p className="text-lg text-red-600 mt-1 mb-2">
                          <strong>PG: </strong>
                          <span className="px-2 rounded-md border-2 border-red-400">
                            {movie?.parental_guidance || "N/A"}
                          </span>
                        </p>
                        <div className="flex sm:flex-row flex-col gap-2">
                          <MovieDescriptionModal
                            description={
                              movie?.description || "No description available."
                            }
                          />
                          <TrailerPlayerModal
                            trailer_url={movie?.trailer_url || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-20 bg-black">
            <div className="w-full h-full flex flex-row justify-center md:gap-6 gap-3 items-center mb-6">
              {dayList.length && !showID ? (
                dayList.map((day, i) => (
                  <Button
                    key={i}
                    variant={i === chosenDayList ? "filled" : "outlined"}
                    color="white"
                    onClick={() => setChosenDayList(i)}
                    disabled={!!showID}
                  >
                    {day}
                  </Button>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="min-h-96">
            {showID ? (
              showRoomStatus ? (
                <RoomDisplayMap
                  room_status={showRoomStatus?.room || {}}
                  show_details={showRoomStatus?.show_details || {}}
                  movie={movie}
                />
              ) : (
                <p>
                  <Spinner className=" h-4 w-4" />
                </p>
              )
            ) : (
              <div className="lg:px-36 sm:px-12">
                <div className="w-full pt-12 grid md:grid-cols-4 sm:grid-cols-2 gap-6 text-center">
                  {shows?.[dayList[chosenDayList]]?.map((show, i) => (
                    <MovieScheduleLink
                      key={i}
                      name={i + 1}
                      to={`?showID=${show._id}`}
                      time={show?.time_start}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>
          <Spinner className=" h-4 w-4" />
        </p>
      )}
    </div>
  );
}
