import { PencilIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUserInfo } from "../../app/stores/UserSlice";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UpdateProfilePage() {
  const userPreInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });

  useEffect(() => {
    if (userPreInfo.user_info) {
      setFormData({
        username: userPreInfo.user_info.username,
        first_name: userPreInfo.user_info.first_name,
        last_name: userPreInfo.user_info.last_name,
        phone_number: userPreInfo.user_info.phone_number,
        email: userPreInfo.user_info.email,
      });
    }
  }, []);

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
      .put(`${BASE_URL}/api/user/${userPreInfo.user_id}`, payload, {
        headers: {
          Authorization: `Bear ${userPreInfo.token}`,
        },
      })
      .then((response) => {
        dispatch(setUserInfo(response.data.data));
        toast.success("Update success");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error("Update failed!!!");
      });
  };

  return (
    <div className=" padding-for-header">
      <div className="container mx-auto px-4 py-8 mb-16">
        <Card className="w-full max-w-md mx-auto bg-black shadow-lg rounded-xl overflow-hidden">
          <CardBody className="p-6">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white truncate">
                Cập nhật thông tin người dùng
              </h3>
            </div>

            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="bg-gray-800 rounded-full p-4 flex items-center justify-center">
                <PencilIcon className="h-16 w-16 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-2">
                <div className="col-span-2">
                  <Input
                    required
                    label="Tên tài khoản"
                    color="white"
                    className="w-full"
                    defaultValue={formData.username}
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    required
                    label="Họ"
                    color="white"
                    className="w-full"
                    defaultValue={formData.last_name}
                    name="last_name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    required
                    label="Tên"
                    color="white"
                    className="w-full"
                    defaultValue={formData.first_name}
                    name="first_name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Số điện thoại"
                    color="white"
                    className="w-full"
                    defaultValue={formData.phone_number}
                    name="phone_number"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Email"
                    type="email"
                    color="white"
                    className="w-full"
                    defaultValue={formData.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Button
                color="white"
                className="w-full truncate"
                onClick={handleSubmit}
              >
                Cập nhật
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
