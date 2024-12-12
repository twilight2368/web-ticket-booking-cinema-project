import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import ReCAPTCHA from "react-google-recaptcha";
import MainLogo from "../../../components/logo/MainLogo";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterFormAdmin({ setIsLoggingInAdmin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secret: "",
  });
  const [isVerify, setIsVerify] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmitCaptcha = async (e) => {
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    axios
      .post(`${BASE_URL}/admin/verify-recaptcha`, {
        captchaToken,
      })
      .then((response) => {
        if (response.data.success) {
          setIsVerify(true);
        } else {
          setIsVerify(false);
          toast.error("Verify captcha failed");
        }
      })
      .catch((error) => {
        toast.error("Verify captcha failed");
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/auth/admin-register`, formData, {
        credentials: "include",
      })
      .then((response) => {
        toast.success(response.data.message, { position: "top-left" });
        setIsLoggingInAdmin(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message, { position: "top-left" });
      });
  };

  return (
    <div>
      <Card className=" w-96 h-[500px]">
        <CardBody className=" flex flex-col justify-center items-center gap-6">
          <div className="w-full">
            <MainLogo />
          </div>
          <div className=" text-xl font-black">Đăng ký</div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
              <Input
                label="admin name"
                name="username"
                onChange={handleInputChange}
              />
              <Input
                type="password"
                label="password"
                name="password"
                onChange={handleInputChange}
              />
              <Input
                type="password"
                label="secret"
                name="secret"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <ReCAPTCHA
              onChange={handleCaptchaChange}
              sitekey={import.meta.env.VITE_APP_CAPTCHA}
              className="w-full"
            />
          </div>
          <div className=" w-full">
            {isVerify ? (
              <>
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Đăng ký
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                className="w-full"
                onClick={handleSubmitCaptcha}
              >
                xác minh captcha
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
