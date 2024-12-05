import LogoImage from "../../assets/logo.png";
import { useNavigate } from "react-router";

export default function MainLogo() {
  const navigate = useNavigate();

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <img
        src={LogoImage}
        alt="LogoImg"
        className=" h-16 aspect-square select-none hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
