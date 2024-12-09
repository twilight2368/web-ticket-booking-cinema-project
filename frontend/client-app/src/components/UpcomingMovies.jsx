import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        // Lấy danh sách phim sắp chiếu
        const moviesResponse = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming',
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              language: 'vi-VN',
            },
          }
        );

        // Lấy danh sách thể loại
        const genresResponse = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              language: 'vi-VN',
            },
          }
        );

        const genresMap = genresResponse.data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setMovies(moviesResponse.data.results || []);
        setGenres(genresMap);
      } catch (error) {
        console.error('Error fetching movies or genres:', error);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres[id]?.replace(/Phim\s*/gi, '').trim()) // Loại bỏ từ "Phim"
      .filter((name) => name)
      .join(', ');
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-white mb-4">🔴 Phim sắp chiếu</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-black rounded-lg shadow-md p-4 border-orange-300 border-2">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
            <p className="text-gray-400 text-sm">{getGenreNames(movie.genre_ids)}</p>
            <p className="text-gray-400 text-sm">Ngày phát hành: {movie.release_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UpcomingMovies;
