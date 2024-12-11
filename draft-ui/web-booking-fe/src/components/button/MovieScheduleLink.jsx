import { useNavigate } from "react-router";
import TimeDisplay from "../time/TimeDisplay";

export default function MovieScheduleLink({ to, name, time }) {
  const navigate = useNavigate();
  return (
    <>
      <button
        color="white"
        className="w-full hover:bg-blue-gray-800/60 border-[1px] border-white p-1 rounded-lg duration-200 text-white"
        onClick={() => {
          navigate(to);
        }}
      >
        <span className=" text-xs">--- {name} ---</span>
        <br />
        <span>
          <TimeDisplay isoDate={time} />
        </span>
      </button>
    </>
  );
}
