import { Button } from "@material-tailwind/react";
import MovieShowCard from "../../components/card/MovieShowCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { parse } from "date-fns";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MoviePage() {
  const [data, setData] = useState(null);
  const [dayList, setDayList] = useState([]);
  const [chosenDayList, setChosenDayList] = useState(0);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/show-movie-days`)
      .then((response) => {
        setData(response.data);

        const newDayList = Object.keys(response.data).sort((a, b) => {
          const dateA = parse(a, "dd-MM-yyyy", new Date());
          const dateB = parse(b, "dd-MM-yyyy", new Date());
          return dateA - dateB; // Sorts in ascending order
        });

        setDayList(newDayList);
      })
      .catch((error) => {
        toast.error("Something went wrong!!!");
      });
  }, []);
  return (
    <div className=" w-full px-16 padding-for-header">
      <div className="w-full text-center ">
        <h1 className=" text-2xl font-bold mt-6 mb-6">🍿Phim đang chiếu</h1>
      </div>
      <div className="w-full flex flex-row justify-center md:gap-6 gap-3 items-center mb-6">
        {dayList.length ? (
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
      <div className=" lg:px-12 grid lg:grid-cols-2 sm:grid-cols-1 gap-6 mb-24">
        {data ? (
          <>
            {data[dayList[chosenDayList]].map((movie, i) => {
              return (
                <>
                  <MovieShowCard
                    key={i}
                    movie_id={movie.movie._id}
                    title={movie.movie.title}
                    actors={movie.movie.actors}
                    director={movie.movie.director}
                    genre={movie.movie.genre}
                    duration_in_minutes={movie.movie.duration_in_minutes}
                    country={movie.movie.country}
                    release_date={movie.movie.release_date}
                    parental_guidance={movie.movie.parental_guidance}
                    image_url={movie.movie.image_url}
                    shows={movie.movie.shows}
                  />
                </>
              );
            })}
          </>
        ) : (
          <>2</>
        )}
      </div>
    </div>
  );
}
