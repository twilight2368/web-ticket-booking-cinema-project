import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function RegisterForm() {
  const navigate = useNavigate();
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
    const { confirmPassword, ...payload } = formData;
    if (confirmPassword === formData.password) {
      console.log("====================================");
      console.log(payload);
      console.log("====================================");
      axios
        .post(`${BASE_URL}/auth/register`, payload, {
          credentials: "include",
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/login")
        })
        .catch((error) => {
          toast.error(error.response.data.message);
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
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Input
                    required
                    label="Họ"
                    color="gray"
                    className="w-full"
                    name="first_name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Input
                    required
                    label="Tên"
                    color="gray"
                    className="w-full"
                    name="last_name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Số điện thoại"
                    color="gray"
                    className="w-full"
                    name="phone_number"
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
