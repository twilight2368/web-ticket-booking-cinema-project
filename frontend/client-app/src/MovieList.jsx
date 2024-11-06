import React from 'react';

function MovieList() {
  const movies = [
    { id: 1, title: 'Movie 1', image: 'path-to-image1.jpg' },
    { id: 2, title: 'Movie 2', image: 'path-to-image2.jpg' },
    // thêm các phim khác vào đây
  ];

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Phim đang chiếu</h2>
      <div className="grid grid-cols-4 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-gray-800 text-white p-4">
            <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieList;
