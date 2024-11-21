import React, { useState, useEffect } from 'react';

function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        setBanners(data.results);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentBannerIndex];
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${currentBanner.backdrop_path}`;

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center text-white transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="text-center pt-96 bg-opacity-75">
        <h2 className="text-4xl font-bold">{currentBanner.title}</h2>
        <p className="mt-2">{currentBanner.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
