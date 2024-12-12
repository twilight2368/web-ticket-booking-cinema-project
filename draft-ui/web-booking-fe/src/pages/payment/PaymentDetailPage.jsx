import { Button, Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import toast from "react-hot-toast";
import classNames from "classnames";
import TimeDisplay from "../../components/time/TimeDisplay";
import DayDisplay from "../../components/time/DayDisplay";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MY_URL = import.meta.env.VITE_API_MY_URL;

export default function PaymentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/booking-info/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error("Error fetching data");
      });
  }, []);

  return (
    <div className="w-full lg:px-32 md:px-16 sm:px-0 padding-for-header">
      <div className="pt-4 pb-8 w-full text-center">
        <h1 className=" text-2xl font-bold uppercase">
          thông tin thanh toán hóa đơn
        </h1>
      </div>
      {data ? (
        <>
          {" "}
          <div className=" w-full flex justify-center items-center mb-8">
            <QRCodeCanvas value={`${MY_URL}/booking/${id}`} />
          </div>
          <div className=" w-full flex flex-col gap-2 px-6 md:px-12 mb-24">
            <div className=" w-full flex flex-col gap-6 px-12">
              <Card className="bg-black/0 border-[1px] border-blue-gray-600">
                <CardBody>
                  <div className=" text-white flex flex-col space-y-4">
                    <div className=" text-3xl font-black ">Thông tin phim</div>
                    <div>
                      Phim:{" "}
                      <p className=" line-clamp-2 text-xl">
                        {data.show_id.movie_id.title}
                      </p>
                    </div>
                    <div>
                      Ngày giờ chiếu:{" "}
                      <span className=" text-orange-800 font-black">
                        <TimeDisplay isoDate={data.show_id.time_start} />
                      </span>
                      -{" "}
                      <span className=" text-light-blue-600 font-black">
                        <DayDisplay isoDate={data.show_id.date_show} />
                      </span>
                    </div>
                    <div>
                      Phòng chiếu: <span>{data.show_id.room_id.name}</span>
                    </div>
                    <div>
                      Ghế:{" "}
                      {data.seats.map((seat, i) => {
                        return (
                          <span key={i} className="mx-1 font-bold">
                            R{seat.seat_row}C{seat.seat_column},
                          </span>
                        );
                      })}{" "}
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-black/0 w-full">
                <CardBody className="p-0">
                  <div className=" text-white">
                    <div className="border-[1px] rounded-lg border-blue-gray-600 p-6 flex justify-center flex-col gap-6 w-full">
                      <table className=" w-full text-left text-lg mb-12  shadow-md">
                        <tbody>
                          <tr className="">
                            <td className="px-4 py-2 font-medium text-gray-300">
                              Thanh toán
                            </td>
                            <td className="px-4 py-2 text-white text-2xl font-black">
                              {data.total_price}
                            </td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 font-medium text-gray-300">
                              Trạng thái
                            </td>
                            <td
                              className={classNames(
                                "font-black",
                                data.status === "pending"
                                  ? "text-gray-500"
                                  : "",
                                data.status === "confirmed"
                                  ? "text-green-500"
                                  : "",
                                data.status === "canceled" ? "text-red-500" : ""
                              )}
                            >
                              {data.status}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        color="black"
                        className="w-60 mx-auto"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        quay lại trang chủ
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
