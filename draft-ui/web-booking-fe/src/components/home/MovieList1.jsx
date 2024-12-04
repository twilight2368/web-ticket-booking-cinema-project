import React from "react";
import MovieCard from "../card/MovieCard";

export default function MovieList1() {
  return (
    <div className="w-full">
      <div className=" px-6 w-full text-center">
        <h2 className=" text-2xl font-bold">🎥Phim đang chiếu🍿</h2>
      </div>
      <div className="w-full pt-12 px-24">
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-16 md:gap-12 sm:gap-9 gap-9">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />

          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />

          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />

          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </div>
  );
}
