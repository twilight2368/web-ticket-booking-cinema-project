import { Button, Card, CardBody, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import TimeDisplay from "../../components/time/TimeDisplay";
import { useDispatch } from "react-redux";
import { seatTotalPriceFromSeat } from "../../app/stores/CartSlice";
import DayDisplay from "../../components/time/DayDisplay";
import { clearToken } from "../../app/stores/UserSlice";
import Payment from "../../components/payment/Payment";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function BookingPage() {
  const [bookingId, setBookingId] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(seatTotalPriceFromSeat());
  }, []);

  const handlingBooking = async () => {
    setLoading(true);
    try {
      const seats = [];
      for (const seat of cart.seats) {
        seats.push(seat.seat_id);
      }

      const payload = {
        user_id: user.user_id,
        show_id: cart.show.show_id,
        seats: seats,
        total_price: cart.total_price,
      };

      const bookingCreateResponse = await axios.post(
        `${BASE_URL}/api/create-booking`,
        payload,
        {
          headers: {
            Authorization: `Bear ${user.token}`,
          },
        }
      );

      if (
        bookingCreateResponse.status === 201 &&
        bookingCreateResponse.data._id
      ) {
        const paymenPayload = {
          booking_id: bookingCreateResponse.data._id,
          user_id: user.user_id,
          amount: cart.total_price,
        };

        const PaymentIntentResponse = await axios.post(
          `${BASE_URL}/api/create_intent_payment`,
          paymenPayload,
          {
            headers: {
              Authorization: `Bear ${user.token}`,
            },
          }
        );

        console.log("====================================");
        console.log(PaymentIntentResponse);
        console.log("====================================");

        if (
          PaymentIntentResponse.status === 201 &&
          PaymentIntentResponse.data.clientSecret
        ) {
          setBookingId(bookingCreateResponse.data._id);
          setClientSecret(PaymentIntentResponse.data.clientSecret);
        }
      }
    } catch (error) {
      // Comprehensive error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);

        if (error.response.data.message == "Token Unauthorized") {
          dispatch(clearToken());
        } else {
          toast.error(error.response.data.message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!cart.movie ||
      !cart.seats.length ||
      !cart.room ||
      !cart.show ||
      user.info ||
      user.user_id === "" ? (
        <>
          <div className="w-full h-screen flex flex-col gap-6 justify-center items-center">
            <div className="text-3xl font-bold">
              Bạn không thể đặt vé xem phim ngay bây giờ
            </div>
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                navigate("/");
              }}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </>
      ) : (
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
                      <div className=" text-3xl font-black ">
                        Thông tin phim
                      </div>
                      <div>
                        Phim:{" "}
                        <p className=" line-clamp-2 text-xl">
                          {cart.movie.title}
                        </p>
                      </div>
                      <div>
                        Ngày giờ chiếu:{" "}
                        <span className=" text-orange-800 font-black">
                          <TimeDisplay isoDate={cart.show.time_start} />
                        </span>
                        <span> - </span>
                        <span className=" text-light-blue-600 font-black">
                          <DayDisplay isoDate={cart.show.date_show} />
                        </span>
                      </div>
                      <div>
                        Phòng chiếu:{" "}
                        <span className="text-lg font-bold">
                          {cart.room.name}
                        </span>
                      </div>
                      <div>
                        Ghế:{" "}
                        {cart.seats.map((seat, i) => {
                          return (
                            <>
                              <span className="px-1 font-bold text-lg">
                                R{seat.seat_row}C{seat.seat_column}
                                {i !== cart.seats.length - 1 ? "," : "."}
                              </span>
                            </>
                          );
                        })}{" "}
                      </div>
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
                              <td className="px-4 py-2 text-gray-400">
                                {cart.total_price} ¥
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 font-medium text-gray-300">
                                Số lượng
                              </td>
                              <td className="px-4 py-2 text-gray-400">
                                {cart.seats.length}{" "}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 font-medium text-gray-300">
                                Phí
                              </td>
                              <td className="px-4 py-2 text-gray-400">0 ¥ </td>
                            </tr>
                            <tr className="">
                              <td className="px-4 py-2 font-medium text-gray-300">
                                Tổng cộng
                              </td>
                              <td className="px-4 py-2 font-black text-red-400">
                                {cart.total_price} ¥
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
                      ! Lưu ý: Không mua vé cho trẻ em dưới 13 tuổi đối với các
                      suất chiếu phim kết thúc sau 22h00 và không mua vé cho trẻ
                      em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau
                      23h00.
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 w-full flex justify-center items-top">
                {!clientSecret || !bookingId ? (
                  <>
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
                                  <td className="px-4 py-2 text-gray-400">
                                    {cart.total_price} ¥
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-2 font-medium text-gray-300">
                                    Phí
                                  </td>
                                  <td className="px-4 py-2 text-gray-400">
                                    0{" "}
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="px-4 py-2 font-medium text-gray-300">
                                    Tổng cộng
                                  </td>
                                  <td className="px-4 py-2 font-black text-white">
                                    {cart.total_price} ¥
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <Button
                              color="red"
                              className="w-full flex justify-center"
                              onClick={handlingBooking}
                              disabled={loading}
                            >
                              {loading ? (
                                <Spinner className=" h-4 w-4" />
                              ) : (
                                <>Xác nhận thanh toán</>
                              )}
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
                  </>
                ) : (
                  <>
                    <Payment
                      clientSecret={clientSecret}
                      booking_id={bookingId}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/**
 *
 */
