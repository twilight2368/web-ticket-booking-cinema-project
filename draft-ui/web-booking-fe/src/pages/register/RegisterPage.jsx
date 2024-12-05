import LogoSvg from "../../assets/studio-ghibli-logo.svg";
import { Button } from "@material-tailwind/react";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router";
export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row w-full bg-green-400">
      <div className="md:w-1/3 h-auto md:h-screen relative">
        <img
          src="https://wallpapers.com/images/hd/the-cat-returns-1024-x-1334-wallpaper-218go8un12mzunpo.jpg"
          alt="img"
          className="w-full h-64 md:h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <Button
            onClick={() => {
              navigate("/");
            }}
            size="sm" // Make button smaller on mobile
            className="px-2 py-1 text-xs" // Adjust padding and text size
          >
            Quay lại trang chủ
          </Button>
        </div>
      </div>
      <div className="w-full md:w-2/3 h-auto md:h-screen relative flex flex-col">
        <div className="flex-grow flex justify-center items-center p-4 md:p-6">
          <RegisterForm />
        </div>
        <div className="w-full h-24 md:h-1/6 flex justify-center items-center p-4">
          <img
            src={LogoSvg}
            alt="Logo"
            className="h-full w-auto max-h-16 md:max-h-full"
          />
        </div>
      </div>
    </div>
  );
}
