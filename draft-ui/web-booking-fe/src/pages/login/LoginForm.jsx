import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router";

// LoginForm Component
export default function LoginForm() {
  return (
    <div className="w-full flex justify-center item">
      <Card className="bg-white text-black w-full max-w-md md:w-96 md:h-96">
        <CardBody>
          <div>
            <div className="w-full mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-bold text-center">
                Đăng nhập
              </h2>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 mb-4 md:mb-6">
              <div>
                <Input
                  required
                  label="Tên tài khoản hoặc email"
                  color="gray"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  required
                  label="Mật khẩu"
                  type="password"
                  color="gray"
                  className="w-full"
                />
              </div>
            </div>

            <div className="w-full text-center mb-4">
              <Button
                className="w-full md:w-auto"
                size="md" // Adjust button size
              >
                Đăng nhập
              </Button>
            </div>
            <div className="w-full text-center text-sm md:text-base">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="text-green-600 underline">
                Đăng ký
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
