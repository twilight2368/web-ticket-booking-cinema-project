import React from "react";
import MainLogo from "../logo/MainLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
export default function MainHeader() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full ">
      <div className="flex flex-row items-center w-4/5 mx-auto">
        <div className=" w-2/12">
          <MainLogo />
        </div>
        <div className="w-6/12 flex flex-row flex-shrink-1 gap-12 justify-center items-center text-lg">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
            end
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
          >
            Lịch chiếu
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
          >
            Tin tức
          </NavLink>
          <NavLink
            to="/ticket-price"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
            end
          >
            Giá vé
          </NavLink>
        </div>
        <div className="w-4/12 flex flex-row gap-6 justify-center items-center ">
          <Button
            variant="outlined"
            color="light-blue"
            className=" text-blue-200"
            onClick={() => {
              navigate("/register");
            }}
          >
            đăng ký
          </Button>
          <Button
            variant="filled"
            className=" bg-gradient-to-br from-red-600 to-red-400"
            onClick={() => {
              navigate("/login");
            }}
          >
            đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}
