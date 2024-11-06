import React from 'react';

function Banner() {
  return (
    <section className="bg-cover bg-center h-64" style={{ backgroundImage: 'url(/path-to-image.jpg)' }}>
      <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Cô Dâu Hào Môn - T18</h1>
          <p className="text-lg mt-4">Tìm hiểu thêm về phim...</p>
          <button className="bg-red-600 px-4 py-2 mt-4 rounded">Mua vé ngay</button>
        </div>
      </div>
    </section>
  );
}

export default Banner;
