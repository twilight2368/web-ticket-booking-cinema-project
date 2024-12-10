import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios request with credentials
axios.defaults.withCredentials = true;

// LoginForm Component
export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    const payload = formData;
    console.log("====================================");
    console.log(payload);
    console.log("====================================");
    axios
      .post(`${BASE_URL}/auth/login`, payload, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        toast.success(response.data.message);

        navigate("/");
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full flex justify-center item">
      <Card className="bg-white text-black w-full max-w-md md:w-96 md:h-96">
        <CardBody>
          <form onSubmit={handleSubmit}>
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
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
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
              </div>

              <div className="w-full text-center mb-4">
                <Button
                  type="submit"
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
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
