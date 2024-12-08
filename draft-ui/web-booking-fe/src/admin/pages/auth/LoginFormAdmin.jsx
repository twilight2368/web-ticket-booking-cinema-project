import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import ReCAPTCHA from "react-google-recaptcha";
import MainLogo from "../../../components/logo/MainLogo";
import { useState } from "react";
export default function LoginFormAdmin() {
  const [isVerify, setIsVerify] = useState(false);
  return (
    <div>
      <Card className=" w-96 h-[500px]">
        <CardBody className=" flex flex-col justify-center items-center gap-6">
          <div className="w-full">
            <MainLogo />
          </div>
          <div className=" text-xl font-black">Đăng nhập</div>
          <div className="w-full flex flex-col gap-6">
            <Input label="admin name" />
            <Input type="password" label="password" />
          </div>
          <div>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_APP_CAPTCHA}
              className="w-full"
            />
          </div>
          <div className=" w-full">
            <Button className="w-full" disabled={!isVerify}>
              Đăng nhập
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
