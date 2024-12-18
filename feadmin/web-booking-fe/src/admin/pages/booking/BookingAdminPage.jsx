import { Card, CardBody } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import DayDisplay from "../../components/time/DayDisplay";
import TimeDisplay from "../../components/time/TimeDisplay";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import classNames from "classnames";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function BookingAdminPage() {
  const [active, setActive] = useState(1);
  const [data, setData] = useState();
  const [totalPage, setTotalPage] = useState(1);

  const admin = useSelector((state) => state.admin);

  const next = () => {
    if (active === 10) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/api/all-booking-details?page=${active}&limit=10`, {
          headers: {
            Authorization: `Bear ${admin.admin.jwt}`,
          },
        })
        .then((response) => {
          console.log("====================================");
          setData(response.data.data);
          setTotalPage(response.data.pagination["totalPages"]);

          console.log("====================================");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  }, [active]);

  return (
    <div className="w-full">
      <div className="m-12 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý ĐẶT VÉ
      </div>
      <div className=" flex flex-col gap-6 w-full px-12">
        {data ? (
          <>
            {data.map((item) => {
              return (
                <>
                  {" "}
                  <BookingItemDisplay item={item} />
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      {/* Pagination */}
      <div className="w-full flex justify-center items-center my-12">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <IconButton
            size="sm"
            onClick={prev}
            disabled={active === 1}
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <span className="text-sm sm:text-base font-normal text-gray-600">
            Page <strong>{active}</strong> of <strong>{totalPage}</strong>
          </span>
          <IconButton
            size="sm"
            onClick={next}
            disabled={active === totalPage}
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function BookingItemDisplay({ item }) {
  return (
    <>
      <div className="w-full">
        <Card className="bg-black/0 w-full shadow-none">
          <CardBody className="p-0 border-2 rounded-lg bg-white border-gray-800 border-dashed ">
            <div className="p-8 text-black">
              <div className=" w-full">
                <span className=" capitalize">tên khách hàng: </span>
                <span className="uppercase truncate font-black">
                  {item.user_id.last_name} {item.user_id.first_name}
                </span>
              </div>
              <div className=" w-full">
                <span className=" capitalize">Username: </span>
                <span className="uppercase truncate font-black">
                  {item.user_id.username}
                </span>
              </div>
              <div className=" w-full">
                <span className=" capitalize">Email: </span>
                <span className="uppercase truncate font-black">
                  {item.user_id.email}
                </span>
              </div>
              <div className=" w-full">
                <span className=" capitalize">số điện thoại: </span>
                <span className="uppercase truncate font-black">
                  {item.user_id.phone_number}
                </span>
              </div>
              <div className=" border-t-2 border-dashed border-gray-800 my-3"></div>
              <div>
                Phim:{" "}
                <p className="font-black line-clamp-2">
                  {item.show_id.movie_id.title}
                </p>
              </div>
              <div>
                Ngày giờ chiếu:{" "}
                <span className="font-black">
                  <TimeDisplay isoDate={item.show_id.time_start} />
                </span>
                <span className=" mx-1 ">-</span>
                <span className="font-black">
                  <DayDisplay isoDate={item.show_id.date_show} />
                </span>
              </div>
              <div>
                Phòng chiếu:{" "}
                <span className="font-black">{item.show_id.room_id.name}</span>
              </div>
              <div>
                Ghế:
                {item.seats.map((seat, i) => {
                  return (
                    <span key={i} className="mx-1 font-bold">
                      R{seat.seat_row}C{seat.seat_column},
                    </span>
                  );
                })}{" "}
              </div>
              <div className="">
                <span className="font-medium">Thời gian đặt vé: </span>
                <span className=" font-black ">
                  <DayDisplay isoDate={item.createdAt} />{" "}
                  <TimeDisplay isoDate={item.createdAt} />
                </span>
              </div>
              <div className="">
                <span className="font-medium">Tổng cộng: </span>
                <span className=" font-black ">{item.total_price}</span>
              </div>
              <div className="">
                <span className="font-medium ">Trạng thái: </span>
                <span
                  className={classNames(
                    "font-black",
                    item.status === "pending" ? "text-gray-500" : "",
                    item.status === "confirmed" ? "text-green-500" : "",
                    item.status === "canceled" ? "text-red-500" : ""
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
