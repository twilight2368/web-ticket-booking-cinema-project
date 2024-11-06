import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo bên trái */}
        <div className="flex-shrink-0 flex items-center space-x-2">
        <img src="/film-reel.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">
            <Link to="/">Movie Ticket</Link>
          </h1>
        </div>
        
        {/* Menu chính ở giữa */}
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/schedule" className="hover:text-yellow-400">Lịch chiếu</Link>
          <Link to="/news" className="hover:text-yellow-400">Tin tức</Link>
          <Link to="/prices" className="hover:text-yellow-400">Giá vé</Link>
        </nav>
        
        {/* Đăng nhập/Đăng ký ở bên phải */}
        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-yellow-400">Đăng nhập</Link>
          <Link to="/register" className="hover:text-yellow-400">Đăng ký</Link>
        </div>

      </div>
    </header>
  );
}

export default Header;
