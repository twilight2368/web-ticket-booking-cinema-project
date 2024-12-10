import { useNavigate } from "react-router";

export default function MovieScheduleLink({ to }) {
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
        <span className=" text-xs">Room-1</span>
        <br />
        <span>00:00</span>
      </button>
    </>
  );
}
