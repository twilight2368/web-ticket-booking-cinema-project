import { Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BookingAdminPage() {
  const [active, setActive] = useState(1);

  const next = () => {
    if (active === 10) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };
  return (
    <div className="w-full">
      <div className="m-12 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý ĐẶT VÉ
      </div>
      <div className=" flex flex-col gap-3 w-full px-12">
        <BookingItemDisplay />
        <BookingItemDisplay />
        <BookingItemDisplay />
        <BookingItemDisplay />
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
            Page <strong>{active}</strong> of <strong>10</strong>
          </span>
          <IconButton
            size="sm"
            onClick={next}
            disabled={active === 10}
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function BookingItemDisplay() {
  return (
    <>
      <div className="w-full">
        <Card className="bg-black/0 w-full shadow-none">
          <CardBody className="p-0 border-2 rounded-lg border-gray-800 border-dashed ">
            <div className="p-6 text-black text-xs">
              <div className=" w-full">
                <span className=" capitalize">tên khách hàng</span>
                <p className="uppercase truncate font-black">
                  Lorem ipsum dolor sit
                </p>
              </div>
              <div>
                Phim:{" "}
                <p className="font-black line-clamp-2">My Neighbor Totoro</p>
              </div>
              <div>
                Ngày giờ chiếu: <span className="font-black">00:00</span>-{" "}
                <span className="font-black">06/12/2024</span>
              </div>
              <div>
                Phòng chiếu: <span className="font-black">1</span>
              </div>
              <div>Ghế: K4 </div>
              <div className="">
                <span className="font-medium">Thời gian đặt vé: </span>
                <span className=" font-black ">12-12-2024 10:10</span>
              </div>
              <div className="">
                <span className="font-medium">Tổng cộng: </span>
                <span className=" font-black ">90.000</span>
              </div>
              <div className="">
                <span className="font-medium ">Trạng thái: </span>
                <span className=" font-black text-green-300">success</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
