import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Thêm sự kiện theo dõi trạng thái cuộn
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Đặt trạng thái true khi người dùng cuộn xuống
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 mb-8 ${
        isScrolled ? 'bg-primary/30 shadow-lg backdrop-blur-md' : 'bg-black'
      }`}
    >
      <div className="w-full mx-auto grid grid-cols-3 items-center p-4">
        {/* Logo bên trái */}
        <div className="flex items-center space-x-2">
          <img src="/film-reel.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-white">
            <Link to="/">Movie Ticket</Link>
          </h1>
        </div>

        {/* Menu chính ở giữa */}
        <nav className="flex justify-center space-x-4 text-white">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/schedule" className="hover:text-yellow-400 text-white">
            Lịch chiếu
          </Link>
          <Link to="/news" className="hover:text-yellow-400 text-white">
            Tin tức
          </Link>
          <Link to="/prices" className="hover:text-yellow-400 text-white">
            Giá vé
          </Link>
        </nav>

        {/* Đăng nhập/Đăng ký ở bên phải */}
        <div className="flex justify-end space-x-4">
          <Link to="/login" className="hover:text-yellow-400 text-white">
            <div className='border-2 rounded-lg border-orange-300 p-1'>Đăng nhập</div>
          </Link>
          <Link to="/register" className="hover:text-yellow-400 text-white">
            <div className='border-2 rounded-lg border-orange-300 p-1'>Đăng ký</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
