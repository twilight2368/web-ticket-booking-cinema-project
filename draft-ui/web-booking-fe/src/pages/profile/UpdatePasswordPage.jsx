import { useState } from "react";
import { LockOpenIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for passwords
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation password do not match!");
      return;
    }

    const payload = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    axios
      .put(`${BASE_URL}/api/change-user-password/${user.user_id}`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        toast.success("Password updated successfully!");
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Update failed!!!");
      });
  };

  return (
    <div className="padding-for-header">
      <div className="container mx-auto px-4 py-8 mb-16">
        <Card className="w-full max-w-md mx-auto bg-black shadow-lg rounded-xl overflow-hidden">
          <CardBody className="p-6">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white truncate">
                Update Password
              </h3>
            </div>

            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="bg-gray-800 rounded-full p-4 flex items-center justify-center">
                <LockOpenIcon className="h-16 w-16 text-white" />
              </div>

              {/* Input Fields */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 w-full gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="col-span-1">
                    <Input
                      required
                      label="Old Password"
                      type="password"
                      color="white"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      required
                      label="New Password"
                      type="password"
                      color="white"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      required
                      label="Confirm New Password"
                      type="password"
                      color="white"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                  <Button
                    color="white"
                    className="w-full truncate"
                    type="submit"
                  >
                    Cập nhật
                  </Button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
