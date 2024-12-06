import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Individual Seat Component
export default function SeatDisplay({
  seat,
  isReserved,
  isSelected,
  onSelect,
}) {
  return (
    <button
      className={classNames(
        "md:w-12 md:h-12 h-6 w-6 rounded-md flex justify-center items-center",
        {
          "bg-gray-900 cursor-not-allowed": isReserved,
          "bg-blue-400": isSelected,
          "bg-yellow-800": !isSelected && seat.seat_type === "Vip",
          "bg-blue-gray-400 ": !isSelected && seat.seat_type !== "Vip",
          "hover:opacity-80 cursor-pointer": !isReserved,
        }
      )}
      disabled={isReserved}
      onClick={() => onSelect(seat)}
    >
      {isReserved ? (
        <XMarkIcon strokeWidth={6} className=" h-6 w-6 text-blue-gray-800" />
      ) : (
        <span className=" text-xs sm:hidden hidden md:block lg:block ">
          {seat.seat_row}-{seat.seat_column}
        </span>
      )}
    </button>
  );
}
