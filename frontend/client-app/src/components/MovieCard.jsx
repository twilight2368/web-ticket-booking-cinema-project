import React from "react";

function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          Xuất xứ: {movie.origin} - Thời lượng: {movie.duration} phút
        </p>
        <p className="text-gray-600 text-sm mb-4">Khởi chiếu: {movie.releaseDate}</p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => onEdit(movie.id)}
          >
            Sửa
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => onDelete(movie.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
