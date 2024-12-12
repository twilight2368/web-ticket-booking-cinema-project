import { useNavigate } from "react-router";
import { DateTime } from "luxon";
import TimeDisplay from "../time/TimeDisplay";

export default function MovieScheduleLink({ to, name, time }) {
  const navigate = useNavigate();

  // Parse the provided time and check if it has already passed in UTC+7
  const isPast =
    DateTime.fromISO(time, { zone: "utc" }).setZone("UTC+7").diffNow()
      .milliseconds < 0;

  return (
    <>
      <button
        color="white"
        disabled={isPast} // Disable the button if the time has passed
        className={`w-full p-1 rounded-lg duration-200 text-white border-[1px] border-white hover:bg-blue-gray-800/60 ${
          isPast ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => {
          if (!isPast) navigate(to);
        }}
      >
        <span className="text-xs">--- {name} ---</span>
        <br />
        <span>
          <TimeDisplay isoDate={time} />
        </span>
      </button>
    </>
  );
}
