import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router";

export default function LoginForm() {
  return (
    <div>
      <Card className=" bg-white text-black h-[400px] w-[450px]">
        <CardBody>
          <div>
            <div className="w-full mb-6">
              <h2 className=" text-lg font-bold ">Đăng nhập</h2>
            </div>
            <div className="flex flex-col gap-6 mb-6 ">
              <div>
                <Input required label="Tên tài khoản hoặc email" color="gray" />
              </div>
              <div>
                <Input required label="Mật khẩu" type="password" color="gray" />
              </div>
            </div>
            <div className=" h-12 text-center w-full text-red-400">
              Something went wrong!!!
            </div>
            <div className=" w-full text-center mb-6">
              <Button>Đăng nhập</Button>
            </div>
            <div className=" w-full text-center">
              Bạn đã chưa tài khoản?{" "}
              <Link to="/register" className=" text-green-600 underline">
                Đăng ký
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
