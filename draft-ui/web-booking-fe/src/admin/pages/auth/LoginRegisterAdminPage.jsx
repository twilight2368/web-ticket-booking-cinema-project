import React, { useState } from "react";
import LoginFormAdmin from "./LoginFormAdmin";
import RegisterFormAdmin from "./RegisterFormAdmin";
import { Button } from "@material-tailwind/react";
import {
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function LoginRegisterAdminPage() {
  const [isLoggingInAdmin, setIsLoggingInAdmin] = useState(true);
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className=" w-full h-screen">
        <img
          src="https://images8.alphacoders.com/135/thumb-1920-1354012.png"
          alt=""
          className=" w-full h-full object-cover"
        />
      </div>
      <div className=" absolute top-0 w-full h-full">
        <div className=" w-full h-full flex flex-row gap-0">
          <div className="w-1/2 flex flex-col gap-3 justify-center items-center h-full">
            {isLoggingInAdmin ? (
              <>
                <LoginFormAdmin />
              </>
            ) : (
              <>
                <RegisterFormAdmin />
              </>
            )}
            <div className=" w-96">
              <Button
                onClick={() => {
                  setIsLoggingInAdmin(!isLoggingInAdmin);
                }}
                className="w-full flex justify-center items-center gap-3"
              >
                <span>{isLoggingInAdmin ? "Đăng ký" : "Đăng nhập"}</span>
                <ArrowRightIcon className=" text-white h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
