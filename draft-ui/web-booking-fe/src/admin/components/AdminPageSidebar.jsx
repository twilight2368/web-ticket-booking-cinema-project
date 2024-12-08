import React from "react";
import MainLogo from "../../components/logo/MainLogo";
import LogoSvg from "../../assets/studio-ghibli-logo.svg";
import { NavLink } from "react-router";
import classNames from "classnames";
export default function AdminPageSidebar() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <div className="">
        <MainLogo />
      </div>
      <div className="h-full flex flex-col py-12 flex flex-col gap-3 ">
        <NavLinkAdminDisplay
          end={true}
          to="/admin"
          displayText={"quản lý lịch chiếu phim"}
        />
        <NavLinkAdminDisplay
          end={true}
          to="/admin/movies"
          displayText={"quản lý phim"}
        />
        <NavLinkAdminDisplay
          end={false}
          to="/admin/rooms"
          displayText={"quản lý phòng"}
        />
        <NavLinkAdminDisplay
          end={false}
          to="/admin/news"
          displayText={"quản lý tin tức"}
        />
        <NavLinkAdminDisplay
          end={false}
          to="/admin/bookings"
          displayText={"quản lý đặt vé"}
        />
        <NavLinkAdminDisplay
          end={false}
          to="/admin/users"
          displayText={"quản lý người dùng"}
        />
      </div>
      <div className="">
        <img src={LogoSvg} alt="" />
      </div>
    </div>
  );
}

const NavLinkAdminDisplay = ({ displayText, end, to }) => {
  return (
    <>
      <NavLink
        end={end}
        to={to}
        className={({ isActive }) => {
          return classNames(
            "uppercase p-3 rounded-md text-sm ",
            isActive
              ? " bg-black text-white shadow-sm shadow-black"
              : " hover:bg-black/10"
          );
        }}
      >
        {displayText}
      </NavLink>
    </>
  );
};
