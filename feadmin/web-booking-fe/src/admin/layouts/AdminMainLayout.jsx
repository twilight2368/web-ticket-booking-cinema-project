import { useEffect } from "react";
import { Outlet } from "react-router";
import { Helmet } from "react-helmet";
import AdminPageSidebar from "../components/AdminPageSidebar";
import AdminHeader from "../components/AdminHeader";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../app/stores/AdminSlice";

export default function AdminMainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("admin")) {
      dispatch(setAdmin(JSON.parse(sessionStorage.getItem("admin"))));
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="w-full min-h-screen">
        <div className="w-full h-screen overflow-hidden flex flex-row gap-0 bg-gray-100 text-black">
          <div className="w-1/5 overflow-y-auto h-full p-6">
            <AdminPageSidebar />
          </div>
          <div className="w-4/5 h-full">
            <div className="w-full h-full overflow-y-auto">
              <div className="w-full h-16">
                <AdminHeader />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
