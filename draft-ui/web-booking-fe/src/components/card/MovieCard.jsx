import { Card, CardBody } from "@material-tailwind/react";
import { Link } from "react-router";
import DayDisplay from "../time/DayDisplay";

export default function MovieCard({ movie }) {
  return (
    <div className="w-full">
      <Link to={`/movies/${movie._id}`}>
        <Card className=" w-full text-white bg-black/0">
          <CardBody className="p-0">
            <div className="w-full h-full">
              <div className="w-full mb-2">
                <img
                  src={movie.image_url}
                  alt=""
                  className=" w-full h-full object-cover rounded-lg shadow-md shadow-black"
                />
              </div>
              <div className="w-full">
                <p className=" text-lg text-white truncate text-center">
                  {movie.title ? movie.title : ""}
                </p>
                <p className=" text-sm text-gray-500 truncate text-center">
                  {movie.release_date ? (
                    <DayDisplay isoDate={movie.release_date} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}
