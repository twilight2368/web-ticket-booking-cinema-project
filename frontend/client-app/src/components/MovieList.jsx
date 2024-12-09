import React from 'react';
import NowPlayingMovies from './NowPlayingMovies';
import UpcomingMovies from './UpcomingMovies';

function MovieList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <NowPlayingMovies />
      <UpcomingMovies />
    </div>
  );
}

export default MovieList;
