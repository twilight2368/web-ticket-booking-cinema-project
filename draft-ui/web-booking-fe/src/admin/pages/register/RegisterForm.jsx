import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router";

export default function RegisterForm() {
  return (
    <div>
      <Card className=" bg-white text-black h-[520px] w-[450px]">
        <CardBody>
          <div>
            <div className="w-full mb-6">
              <h2 className=" text-lg font-bold ">Đăng ký</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6 ">
              <div className=" col-span-2">
                <Input required label="Tên tài khoản" color="gray" />
              </div>
              <div className=" col-span-1">
                <Input required label="Họ" color="gray" />
              </div>
              <div className=" col-span-1">
                <Input required label="Tên" color="gray" />
              </div>
              <div className=" col-span-2">
                <Input required label="Số điện thoại" color="gray" />
              </div>
              <div className=" col-span-2">
                <Input required label="Email" type="email" color="gray" />
              </div>
              <div className=" col-span-1">
                <Input required label="Mật khẩu" type="password" color="gray" />
              </div>
              <div className="col-span-1">
                <Input
                  required
                  label="Xác nhận mật khẩu"
                  type="password"
                  color="gray"
                />
              </div>
            </div>
            <div className=" h-12 text-center w-full text-red-400">
              Something went wrong!!!
            </div>
            <div className=" w-full text-center mb-6">
              <Button>Đăng ký</Button>
            </div>
            <div className=" w-full text-center">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className=" text-blue-400 underline">
                Đăng nhập
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

//<Input label="Tên tài khoản" color="gray" />
