import React from "react";
import { Outlet } from "react-router";
import LoginRegisterAdminPage from "../pages/auth/LoginRegisterAdminPage";
import { Helmet } from "react-helmet";
import AdminPageSidebar from "../components/AdminPageSidebar";
export default function AdminMainLayout() {
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="w-full min-h-screen">
        {true ? (
          <>
            <div className=" w-full h-screen overflow-hidden flex flex-row gap-0 bg-gray-100 text-black">
              <div className=" w-1/5 overflow-y-auto h-full p-6 ">
                <AdminPageSidebar />
              </div>
              <div className=" w-4/5 h-full">
                <div className="w-full h-full overflow-y-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoginRegisterAdminPage />
        )}
      </div>
    </>
  );
}
