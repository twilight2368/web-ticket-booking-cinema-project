import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Movie Ticket Booking. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" role ="button" className="text-yellow-400 hover:underline">Privacy Policy</a> | 
          <a href="#" role ="button" className="text-yellow-400 hover:underline"> Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
