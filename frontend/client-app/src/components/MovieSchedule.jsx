import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MovieSchedule() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=vi-VN&page=1`
      );
      const data = await response.json();
      setMovies(data.results || []);
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black text-white py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🎬Phim Đang Chiếu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex border-orange-300 border-2 "
          >
            {/* Hình ảnh phim */}
            <div className="flex-shrink-0 w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Nội dung phim */}
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {movie.overview}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Ngày phát hành:</span> {movie.release_date}
              </p>
              <p className="text-sm mb-4">
                <span className="font-bold">Điểm đánh giá:</span> {movie.vote_average}/10
              </p>
              <div>
                <h3 className="text-md font-bold mb-2">Lịch chiếu:</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Dữ liệu mẫu cho lịch chiếu */}
                  {["10:15", "11:05", "12:20", "13:40", "15:15"].map((time, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 px-3 py-1 rounded text-sm"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieSchedule;
