import React, { useEffect, useState } from "react";
import MovieCard from "../card/MovieCard";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function MovieList1() {
  const [movieList, setMovieList] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/show-movies-today`)
      .then((response) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        setMovieList(response.data.data);
      })
      .catch((error) => {
        toast.error("Error fetch movie...", { position: "top-right" });
        setMovieList([]);
      });
  }, []);

  return (
    <div className="w-full">
      <div className=" px-6 w-full text-center">
        <h2 className=" text-2xl font-bold">🎥Phim đang chiếu🍿</h2>
      </div>
      <div className="w-full pt-12 px-24">
        {movieList ? (
          <>
            {" "}
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-16 md:gap-12 sm:gap-9 gap-9">
              {movieList ? (
                <>
                  {movieList.map((movie, i) => {
                    return (
                      <>
                        <MovieCard movie={movie} key={i} />
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex justify-center items-center mt-10 mb-20">
              <Spinner className="h-12 w-12" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
