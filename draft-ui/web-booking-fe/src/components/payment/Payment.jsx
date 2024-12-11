import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);


export default function Payment({ clientSecret, booking_id }) {
  const options = {
    clientSecret: clientSecret,
  };
  return (
    <div className=" flex justify-center items-center">
      {clientSecret && stripePromise ? (
        <>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required", // Prevent automatic redirect
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button color="blue" type="submit" disabled={!stripe || !elements}>
        Thanh toán
      </Button>
    </form>
  );
};
