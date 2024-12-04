import LogoSvg from "../../../assets/studio-ghibli-logo.svg";
import { Button } from "@material-tailwind/react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-0 w-full bg-blue-600  ">
      <div className="h-screen w-1/3">
        <img
          src="https://media.mstdn.social/media_attachments/files/109/676/824/071/286/154/original/303320af1ea852aa.jpg"
          alt="img"
          className="h-full w-full object-cover object-bottom"
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
        <div className="absolute top-0 w-full h-full p-24 flex justify-center">
          <LoginForm />
        </div>
        <div className="h-5/6 w-full"></div>
        <div className="w-full h-1/6 flex justify-center items-center">
          <img src={LogoSvg} alt="" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
}
