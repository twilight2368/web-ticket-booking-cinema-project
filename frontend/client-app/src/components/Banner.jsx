import React from 'react';

function Banner() {
  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center text-white" style={{ backgroundImage: 'url("/movie_banner.png")' }}>
      <div className="text-center pt-96">
        <h2 className="text-4xl font-bold">Welcome to Movie Ticket Booking</h2>
        <p className="mt-2">Book your favorite movies now!</p>
      </div>
    </div>
  );
}

export default Banner;
