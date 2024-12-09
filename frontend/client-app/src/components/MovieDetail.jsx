import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Showtimes from './Showtimes';

// Dữ liệu giờ chiếu mẫu
const showtimes = [
  {
    date: 'Th. 11 21',
    day: 'Thứ năm',
    times: ['12:00', '14:05', '16:10', '19:00', '19:50', '20:55', '21:55', '22:55', '23:10'],
  },
  {
    date: 'Th. 11 22',
    day: 'Thứ sáu',
    times: ['10:00', '13:00', '15:10', '18:00', '20:00', '22:00'],
  },
];

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
    <div className="container mx-auto my-8 text-white bg-gray-900">
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
      {/* Tích hợp phần Showtimes*/}
      <Showtimes showtimes={showtimes}/>
    </div>
  );
}

export default MovieDetail;
