import React from 'react';

function Footer() {
  return (
    <footer className="w-full text-center bg-[#0B0D13] text-white py-4">
        <p>&copy; 2024 Movie Ticket Booking. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" role ="button" className="text-yellow-400 hover:underline">Privacy Policy</a> | 
          <a href="#" role ="button" className="text-yellow-400 hover:underline"> Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
