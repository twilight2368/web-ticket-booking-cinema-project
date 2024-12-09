import React from 'react';

function NewsSection() {
  return (
    <div className="container mx-auto my-10 text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Replace with dynamic content */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-black rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold">News Title {index + 1}</h3>
            <p className="mt-2 text-gray-700">Some news description here...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
