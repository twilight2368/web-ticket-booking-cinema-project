import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/admin-booking"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-gray-200"
            }
          >
            Quản lý Đăng ký Vé
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/movie-management"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-gray-200"
            }
          >
            Quản lý Phim
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/schedule-management"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-gray-200"
            }
          >
            Quản lý Lịch Chiếu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news-management"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-gray-200"
            }
          >
            Quản lý Tin Tức
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
