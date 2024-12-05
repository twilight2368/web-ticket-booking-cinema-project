import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className=" padding-for-header">
      <div className="container mx-auto px-4 py-8 mb-16">
        <Card className="w-full max-w-md mx-auto bg-black shadow-lg rounded-xl overflow-hidden">
          <CardBody className="p-6">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white truncate">
                Thông tin người dùng
              </h3>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-6 mb-8">
              {/* User Icon */}
              <div className="bg-gray-800 rounded-full p-4 flex items-center justify-center">
                <UserIcon className="h-16 w-16 text-white" />
              </div>

              {/* User Info */}
              <div className="w-full text-white text-center space-y-2">
                <DetailRow
                  icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
                  value={"Username"}
                />
                <DetailRow
                  icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
                  value={"Full name"}
                />
                <DetailRow
                  icon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
                  value={"0000000000"}
                />
                <DetailRow
                  icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                  value={"mail@gmail.com"}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                color="white"
                className="w-full  truncate"
                onClick={() => {
                  navigate("/update-profile");
                }}
              >
                Cập nhật thông tin người dùng
              </Button>
              <Button
                color="white"
                className="w-full truncate"
                onClick={() => {
                  navigate("/update-password");
                }}
              >
                cập nhật mật khẩu
              </Button>
              <Button color="red" className="w-full truncate">
                Đăng xuất tài khoản
              </Button>
              <Button
                color="red"
                variant="outlined"
                className="w-full truncate"
              >
                xóa tài khoản
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

// Reusable component for detail rows
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex w-full items-center bg-gray-800 rounded-lg p-3 space-x-4">
      <div className="flex-shrink-0 w-1/12">{icon}</div>
      <p className="text-white font-semibold truncate w-11/12">{value}</p>
    </div>
  );
}
