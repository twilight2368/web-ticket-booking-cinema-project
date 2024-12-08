import { Button, Card, CardBody } from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { QRCodeCanvas } from "qrcode.react";
export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="w-full padding-for-header">
      <div className="pt-4 pb-8 w-full text-center">
        <h1 className=" text-2xl font-bold uppercase">
          thông tin thanh toán hóa đơn
        </h1>
      </div>
      <div className=" w-full flex justify-center items-center mb-8">
        <QRCodeCanvas value="http//localhost:3000" />
      </div>
      <div className=" w-full flex flex-col gap-2 px-6 md:px-12 mb-24">
        <div className=" w-full flex flex-col gap-6 px-12">
          <Card className="bg-black/0 border-[1px] border-blue-gray-600">
            <CardBody>
              <div className=" text-white flex flex-col space-y-4">
                <div className=" text-3xl font-black ">Thông tin phim</div>
                <div>
                  Phim:{" "}
                  <p className=" line-clamp-2 text-xl">My Neighbor Totoro</p>
                </div>
                <div>
                  Ngày giờ chiếu:{" "}
                  <span className=" text-orange-800 font-black">00:00</span>-{" "}
                  <span className=" text-light-blue-600 font-black">
                    06/12/2024
                  </span>
                </div>
                <div>Phòng chiếu 5</div>
                <div>Ghế: K4 </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-black/0 w-full">
            <CardBody className="p-0">
              <div className=" text-white">
                <div className="border-[1px] rounded-lg border-blue-gray-600 p-6 flex justify-center flex-col gap-6 w-full">
                  <div className=" p-3 flex flex-col gap-3">
                    <div className=" w-full">
                      <span className=" uppercase">tên khách hàng</span>
                      <p className=" truncate font-bold">
                        Lorem ipsum dolor sit
                      </p>
                    </div>
                    <div className=" w-full">
                      <span className=" uppercase">Email</span>
                      <p className=" truncate font-bold"> Email@gamil.com</p>
                    </div>
                    <div className=" w-full">
                      <span className=" uppercase">số điện thoại</span>
                      <p className=" truncate font-bold">0000000000</p>
                    </div>
                  </div>
                  <table className=" w-full text-left text-lg mb-12  shadow-md">
                    <tbody>
                      <tr className="">
                        <td className="px-4 py-2 font-medium text-gray-300">
                          Thanh toán
                        </td>
                        <td className="px-4 py-2 text-gray-400">90.000 </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium text-gray-300">
                          Phí
                        </td>
                        <td className="px-4 py-2 text-gray-400">0 </td>
                      </tr>
                      <tr className="">
                        <td className="px-4 py-2 font-medium text-gray-300">
                          Tổng cộng
                        </td>
                        <td className="px-4 py-2 font-black text-white">
                          90.000
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-4 py-2 font-medium text-gray-300">
                          Trạng thái
                        </td>
                        <td className="px-4 py-2 font-black text-green-300">
                          success
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
    </div>
  );
}
