import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.confirmPassword === formData.password) {
      fetch(`${BASE_URL}/server/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            console.log("====================================");
            console.log(res);
            console.log("====================================");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log("====================================");
          console.log(data);
          console.log("====================================");
        });
    } else {
      toast.error("Xác nhận mật khẩu không khớp");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="bg-white text-black w-full max-w-md md:w-[450px] md:h-[500px]">
        <CardBody>
          <form onSubmit={handleSubmit}>
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
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Input
                    required
                    label="Họ"
                    color="gray"
                    className="w-full"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Input
                    required
                    label="Tên"
                    color="gray"
                    className="w-full"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Số điện thoại"
                    color="gray"
                    className="w-full"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Email"
                    type="email"
                    color="gray"
                    className="w-full"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Input
                    required
                    label="Mật khẩu"
                    type="password"
                    color="gray"
                    className="w-full"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Input
                    required
                    label="Xác nhận mật khẩu"
                    type="password"
                    color="gray"
                    className="w-full"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-full text-center mb-4">
                <Button className="w-full md:w-auto" size="md" type="submit">
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
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
