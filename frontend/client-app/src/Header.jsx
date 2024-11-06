import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="logo text-xl">Logo</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-gray-400">Trang chủ</a></li>
          <li><a href="/lich-chieu" className="hover:text-gray-400">Lịch chiếu</a></li>
          <li><a href="/tin-tuc" className="hover:text-gray-400">Tin tức</a></li>
        </ul>
        <div>
          <button className="bg-red-600 px-4 py-2 rounded">Đăng nhập</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
