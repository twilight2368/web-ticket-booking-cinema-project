import React, { useState } from "react";
import MainLogo from "../logo/MainLogo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function MainHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full backdrop-blur-md fixed top-0 left-0 z-50 header-height ">
      <div className="relative container mx-auto px-4">
        
        <div className="flex flex-row items-center justify-between py-4">
          
          <div className="w-auto">
            <MainLogo />
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-red-400" : "text-white"
              }
              end
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? "text-red-400" : "text-white"
              }
            >
              Lịch chiếu
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? "text-red-400" : "text-white"
              }
            >
              Tin tức
            </NavLink>
            <NavLink
              to="/ticket-price"
              className={({ isActive }) =>
                isActive ? "text-red-400" : "text-white"
              }
              end
            >
              Giá vé
            </NavLink>
          </div>

          {/* User Actions */}
          <div className="w-auto">
            {false ? (
              <div className="hidden md:flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-white" />
                <Link
                  to="/profile"
                  className="text-white hover:underline text-sm truncate"
                >
                  Username
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex space-x-4">
                <Button
                  variant="outlined"
                  color="blue"
                  className="text-white"
                  onClick={() => navigate("/register")}
                >
                  đăng ký
                </Button>
                <Button
                  variant="filled"
                  className="bg-gradient-to-br from-red-600 to-red-400"
                  onClick={() => navigate("/login")}
                >
                  đăng nhập
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/75 ">
            <div className="flex flex-col items-center space-y-4 py-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
                onClick={toggleMenu}
                end
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
                onClick={toggleMenu}
              >
                Lịch chiếu
              </NavLink>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
                onClick={toggleMenu}
              >
                Tin tức
              </NavLink>
              <NavLink
                to="/ticket-price"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
                onClick={toggleMenu}
                end
              >
                Giá vé
              </NavLink>

              {false ? (
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-8 w-8 text-white" />
                  <Link
                    to="/profile"
                    className="text-white hover:underline text-sm"
                    onClick={toggleMenu}
                  >
                    Username
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 w-full px-4">
                  <Button
                    variant="outlined"
                    color="blue"
                    className="text-white w-full"
                    onClick={() => {
                      navigate("/register");
                      toggleMenu();
                    }}
                  >
                    đăng ký
                  </Button>
                  <Button
                    variant="filled"
                    className="bg-gradient-to-br from-red-600 to-red-400 w-full"
                    onClick={() => {
                      navigate("/login");
                      toggleMenu();
                    }}
                  >
                    đăng nhập
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
