import { Button } from "@material-tailwind/react";
import MovieShowCard from "../../components/card/MovieShowCard";

export default function MoviePage() {
  return (
    <div className=" w-full px-16 padding-for-header">
      <div className="w-full text-center ">
        <h1 className=" text-2xl font-bold mt-6 mb-6">🍿Phim đang chiếu</h1>
      </div>
      <div className="w-full flex flex-row justify-center md:gap-6 gap-3 items-center mb-6">
        <Button variant="outlined" color="white">
          01/01/2024
        </Button>
        <Button variant="outlined" color="white">
          02/01/2024
        </Button>
        <Button variant="outlined" color="white">
          03/01/2024
        </Button>
      </div>
      <div className=" lg:px-12 grid lg:grid-cols-2 grid-cols-1 gap-6 mb-24">
        <MovieShowCard />
        <MovieShowCard />

        <MovieShowCard />
        <MovieShowCard />

        <MovieShowCard />
        <MovieShowCard />

        <MovieShowCard />
        <MovieShowCard />
      </div>
    </div>
  );
}
