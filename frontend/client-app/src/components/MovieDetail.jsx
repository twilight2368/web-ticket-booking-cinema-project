import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams(); // Lấy movie ID từ URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: 'en-US',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto my-8">
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-1/3 rounded-lg"
        />
        <div className="ml-8">
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          <p className="mt-4 text-gray-700">{movie.overview}</p>
          <p className="mt-4"><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          {/* Thêm các chi tiết khác nếu cần */}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
