import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import MainFooter from "../components/footer/MainFooter";
import Top from "../components/top/Top";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginContext } from "../context/LoginContext";

export default function MainLayout() {
  const { setIsLogin } = useContext(LoginContext);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user_id !== "" && user.user_info && user.token !== "") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div>
      <Top></Top>
      <div className=" header-height fixed top-0 w-full z-[100]">
        <MainHeader />
      </div>
      <div className=" min-h-screen">
        <Outlet />
      </div>
      <div className="w-full">
        <MainFooter />
      </div>
    </div>
  );
}
