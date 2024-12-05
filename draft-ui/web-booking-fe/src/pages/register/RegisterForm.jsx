import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router";

export default function RegisterForm() {
  return (
    <div className="w-full flex justify-center">
      <Card className="bg-white text-black w-full max-w-md md:w-[450px] md:h-[520px]">
        <CardBody>
          <div>
            <div className="w-full mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-bold text-center">
                Đăng ký
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="col-span-2">
                <Input
                  required
                  label="Tên tài khoản"
                  color="gray"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Input required label="Họ" color="gray" className="w-full" />
              </div>
              <div className="col-span-1">
                <Input required label="Tên" color="gray" className="w-full" />
              </div>
              <div className="col-span-2">
                <Input
                  required
                  label="Số điện thoại"
                  color="gray"
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Input
                  required
                  label="Email"
                  type="email"
                  color="gray"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Input
                  required
                  label="Mật khẩu"
                  type="password"
                  color="gray"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Input
                  required
                  label="Xác nhận mật khẩu"
                  type="password"
                  color="gray"
                  className="w-full"
                />
              </div>
            </div>
            {!false ? (
              <>
                <div className="h-8 md:h-12 text-center w-full text-gray-400 mb-2"></div>
              </>
            ) : (
              <>
                <div className="h-8 md:h-12 text-center w-full text-red-400 mb-2">
                  Something went wrong!!!
                </div>
              </>
            )}
            <div className="w-full text-center mb-4">
              <Button
                className="w-full md:w-auto"
                size="md" // Adjust button size
              >
                Đăng ký
              </Button>
            </div>
            <div className="w-full text-center text-sm md:text-base">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Đăng nhập
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
