import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import MainFooter from "../components/footer/MainFooter";
import Top from "../components/top/Top";
import LoginProvider from "../context/LoginProvider";

export default function MainLayout() {
  return (
    <div>
      <Top></Top>
      <LoginProvider>
        <div className=" header-height fixed top-0 w-full z-[100]">
          <MainHeader />
        </div>
        <div className=" min-h-screen">
          <Outlet />
        </div>
        <div className="w-full">
          <MainFooter />
        </div>
      </LoginProvider>
    </div>
  );
}
