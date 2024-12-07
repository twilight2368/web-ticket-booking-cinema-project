import { Button, Card, CardBody } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router";
import { useEffect } from "react";
const stripePromise = loadStripe(
  "pk_test_51PWvaZRpXSLWXJNJMk383qm15gN1zFjo1Yk3LVZaL4wnf7jYolUddYlO7VQMTTSK6uflRwUgG4ZfmJ5dsidiniLG00usKdVNGB"
);

export default function BookingPage() {
  return (
    <div className="w-full padding-for-header">
      <div className="pt-4 pb-8 w-full text-center">
        <h1 className=" text-2xl font-bold">Thanh toán </h1>
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
                        <td className="px-4 py-2 text-gray-400">90.000 VND</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium text-gray-300">
                          Phí
                        </td>
                        <td className="px-4 py-2 text-gray-400">0 VND</td>
                      </tr>
                      <tr className="">
                        <td className="px-4 py-2 font-medium text-gray-300">
                          Tổng cộng
                        </td>
                        <td className="px-4 py-2 font-black text-white">
                          90.000 VND
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="md:w-1/3 w-full p-6">
          <div className="w-full">
            <Elements stripe={stripePromise}>
              <PaymentForm amount={90000} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("====================================");
    console.log(stripe);
    console.log(elements);

    console.log("====================================");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Call your backend to create a payment intent
    const response = await fetch(
      "http://localhost:3000/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );
    const paymentIntentData = await response.json();

    // Confirm the payment with the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.log(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type="submit"
        disabled={!stripe}
        color="red"
        className="w-full my-6"
      >
        Thanh toán
      </Button>
      <Button
        color="white"
        variant="outlined"
        onClick={() => {
          navigate(-1);
        }}
        className="w-full mb-6"
      >
        quay lại
      </Button>
      <div className=" text-orange-800 italic text-sm">
        ! Lưu ý: Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu
        phim kết thúc sau 22h00 và không mua vé cho trẻ em dưới 16 tuổi đối với
        các suất chiếu phim kết thúc sau 23h00.
      </div>
    </form>
  );
};
