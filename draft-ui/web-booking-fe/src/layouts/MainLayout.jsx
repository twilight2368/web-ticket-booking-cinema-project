import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import MainFooter from "../components/footer/MainFooter";
import Top from "../components/top/Top";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from "../context/LoginContext";
import { clearUserInfor, setToken } from "../app/stores/UserSlice";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MainLayout() {
  const { setIsLogin } = useContext(LoginContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.user_id !== "" && user.user_info) {
      if (user.token == "") {
        axios
          .get(`${BASE_URL}/auth/new-token`, {
            withCredentials: true,
          })
          .then((response) => {
            dispatch(setToken(response.data.jwt));
            console.log('====================================');
            console.log("Here");
            console.log('====================================');
          })
          .catch((error) => {
            if (error.response.data.message == "Session Unauthorized") {
              toast.error("Session Unauthorized please login");
              dispatch(clearUserInfor());
            } else {
              toast.error("Failed to generate token please logout");
            }
          });
      } else {
        setIsLogin(true);
      }
    } else {
      dispatch(clearUserInfor());  
      setIsLogin(false);
    }
  }, [user.token]);

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
