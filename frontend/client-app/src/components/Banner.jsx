import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '@material-tailwind/react';

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
    if (banners.length > 0) {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  } 
  }, [banners]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-screen">
      <Carousel
        activeIndex={currentBannerIndex} // Controls the current active slide
        onChange={(index) => setCurrentBannerIndex(index)} // Sync index on manual change
        className="rounded-xl"
      >
        {banners.map((banner, index) => {
          const backgroundImageUrl = `https://image.tmdb.org/t/p/original${banner.backdrop_path}`;
          return (
            <Link to={`/movie/${banner.id}`} key={banner.id}>
              <div
                className="h-screen w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${backgroundImageUrl})`,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white">
                  <h2 className="text-4xl font-bold">{banner.title}</h2>
                  <p className="mt-4 text-lg max-w-3xl text-center">
                    {banner.overview}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Banner;
