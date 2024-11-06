import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: 'en-US',
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Movies Now Showing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-white rounded-lg shadow p-4 text-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="mt-2 text-gray-700">{movie.overview.substring(0, 60)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
