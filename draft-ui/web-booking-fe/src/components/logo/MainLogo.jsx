import LogoImage from "../../assets/film-reel.png";
import { useNavigate } from "react-router";
export default function MainLogo() {
  const navigate = useNavigate();

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <img
        src={LogoImage}
        alt="LogoImg"
        className=" h-16 aspect-square hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
