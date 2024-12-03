import React from "react";

function NewsCard({ news, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-2">Ngày: {news.date}</p>
        <p className="text-gray-600 text-sm mb-4 truncate">{news.content}</p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => onEdit(news.id)}
          >
            Sửa
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => onDelete(news.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
