import LogoSvg from "../../../assets/studio-ghibli-logo.svg";
import { Button } from "@material-tailwind/react";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router";
export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-0 w-full bg-green-400 ">
      <div className="h-screen w-1/3 relative">
        <img
          src="https://wallpapers.com/images/hd/the-cat-returns-1024-x-1334-wallpaper-218go8un12mzunpo.jpg"
          alt="img"
          className="h-full object-cover"
        />
        <div className=" absolute top-2 left-2">
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            quay lại trang chủ
          </Button>
        </div>
      </div>
      <div className="h-screen w-2/3 relative">
        <div className="absolute top-0 w-full h-full p-6 flex justify-center">
          <RegisterForm />
        </div>
        <div className="h-5/6 w-full"></div>
        <div className="w-full h-1/6 flex justify-center items-center">
          <img src={LogoSvg} alt="" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
}
