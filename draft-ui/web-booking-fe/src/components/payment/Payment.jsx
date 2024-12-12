import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearToken } from "../../app/stores/UserSlice";
import StripeLogo from "../../assets/stripe.png";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Payment({ clientSecret, booking_id }) {
  const options = {
    clientSecret: clientSecret,
    theme: "night",
  };

  useEffect(() => {
    console.log("====================================");
    console.log(clientSecret, booking_id, stripePromise);
    console.log("====================================");
  }, []);

  return (
    <div className=" flex flex-col justify-center items-start ">
      {clientSecret && stripePromise ? (
        <>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm booking_id={booking_id} />
          </Elements>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

const CheckoutForm = ({ booking_id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      //! Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Prevent automatic redirect
    });

    const payload = {
      bookingId: booking_id,
    };

    if (result.error) {
      toast.error("Payment incompleted");
      console.log(result.error.message);
      payload.paymentStatus = "failed";
      payload.bookingStatus = "canceled";
    } else {
      payload.paymentStatus = "successful";
      payload.bookingStatus = "confirmed";
    }

    axios
      .put(`${BASE_URL}/api/update-pd-status`, payload, {
        headers: {
          Authorization: `Bear ${user.token}`,
        },
      })
      .then((response) => {
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
        toast.success("Booking successful ☑️");
      })
      .catch((error) => {
        // Comprehensive error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Data:", error.response.data);
          console.error("Status:", error.response.status);
          toast.error(error.response.data.message);
          if (error.response.data.message == "Token Unauthorized") {
            dispatch(clearToken());
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", error.message);
        }
      })
      .finally(() => {
        navigate(`/booking/${booking_id}`);
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <CardBody>
          <div className=" h-12 w-full flex justify-center items-center mb-6">
            <img src={StripeLogo} alt="" className="h-full w-auto " />
          </div>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col justify-center items-center gap-12"
          >
            <PaymentElement />
            <Button
              color="blue"
              type="submit"
              disabled={!stripe || !elements || loading}
            >
              {loading ? (
                <>
                  <Spinner className=" h-4 w-4" />
                </>
              ) : (
                <>Thanh toán</>
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};
