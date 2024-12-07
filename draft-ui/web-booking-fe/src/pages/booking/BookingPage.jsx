import { Button, Card, CardBody } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export default function BookingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full padding-for-header">
        <div className="pt-4 pb-8 w-full text-center">
          <h1 className=" text-2xl font-bold">Thanh toán</h1>
        </div>
        <div className=" w-full flex md:flex-row flex-col gap-2 px-12 mb-24">
          <div className="md:w-2/3 w-full flex flex-col gap-6 px-12">
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

            <Card className="bg-black/0">
              <CardBody className="px-0">
                <div className=" text-white">
                  <div className="border-[1px] rounded-lg border-blue-gray-600 p-3 w-full">
                    <table className=" w-full text-left text-lg  shadow-md">
                      <tbody>
                        <tr className="">
                          <td className="px-4 py-2 font-medium text-gray-300">
                            Thanh toán
                          </td>
                          <td className="px-4 py-2 text-gray-400">90.000 </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-300">
                            Số lượng
                          </td>
                          <td className="px-4 py-2 text-gray-400">0 </td>
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
                          <td className="px-4 py-2 font-black text-red-400">
                            90.000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="w-full">
              <div className="w-full">
                <div className=" text-orange-800 italic text-sm">
                  ! Lưu ý: Không mua vé cho trẻ em dưới 13 tuổi đối với các suất
                  chiếu phim kết thúc sau 22h00 và không mua vé cho trẻ em dưới
                  16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 w-full flex justify-center items-top">
            <Card className="bg-black/0 w-full">
              <CardBody className="px-6 py-0">
                <div className=" text-white">
                  <div className="border-[1px] rounded-lg border-blue-gray-600 p-6 flex justify-center flex-col gap-6 w-full">
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
                      </tbody>
                    </table>
                    <Button color="red" className="w-full">
                      Xác nhận thanh toán
                    </Button>
                    <Button
                      color="black"
                      className="w-full"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      trở lại
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
