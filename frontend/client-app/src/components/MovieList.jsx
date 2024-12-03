import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Thêm state cho tổng số trang

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: 'en-US',
            page: page,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Cập nhật tổng số trang từ API
        console.log(response);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [page]);

  // Hàm xử lí chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

   // Tạo các nút cho các trang xung quanh trang hiện tại
   const renderPageNumbers = () => {
    const pages = [];

    // Hiển thị trang đầu và các trang lân cận
    if (page > 3) {
      pages.push(1, "...");
    }

    // Hiển thị 5 trang xung quanh trang hiện tại
    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
      pages.push(i);
    }

    // Hiển thị trang cuối và các trang lân cận
    if (page < totalPages - 2) {
      pages.push("...", totalPages);
    }

    return pages.map((p, index) => (
      <button
        key={index}
        onClick={() => typeof p === "number" && handlePageChange(p)}
        disabled={p === "..."}
        className={`px-4 py-2 mx-1 rounded ${page === p ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
      >
        {p}
      </button>
    ));
  };

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
      {/* Nút điều hướng trang */}
      <div className='flex justify-center mt-6'>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Trang trước
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default MovieList;
