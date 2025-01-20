/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import useSocket from "./Socket";
const CheckoutForm = ({ camp, refetch, handleClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { sendNotification } = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const paymentInfo = {
      name: camp.participantName,
      email: camp.participantEmail,
      fees: camp.campFees,
    };
    try {
      // get client secret key
      const { data } = await axiosSecure.post(
        "/create-confirm-intent",
        paymentInfo
      );
      const clientSecret = data?.clientSecret;
      // validate
      if (!stripe || !elements || !clientSecret) {
        setError("Stripe is not loaded or client secret is missing");
        setProcessing(false);
        return;
      }
      // get card element
      const cardElement = elements.getElement(CardElement);

      // confirm payment
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: paymentInfo.name,
              email: paymentInfo.email,
            },
          },
        });

      //if error
      if (paymentError) {
        setError(paymentError.message);
        setProcessing(false);
        return;
      }

      // if succeed
      if (paymentIntent.status === "succeeded") {
        // add payment history on db
        const paymentData = {
          campName: camp.campName,
          campFees: camp.campFees,
          participantEmail: camp.participantEmail,
          participantName: camp.participantName,
          participantID: camp._id,
          transactionID: paymentIntent.id,
        };
        const { data: paymentRes } = await axiosSecure.post(
          `/payments/${camp._id}`,
          paymentData
        );
        // sent notification
        sendNotification(paymentIntent.id, camp.campName);
        handleClose();
        toast.success(paymentRes.message);
        refetch();
      }
    } catch (error) {
      toast.error("Payment Failed. Please try again.");
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mb-4"
    >
      <div className="w-full max-w-md bg-white rounded-lg sm:p-6 pt-0">
        <h3 className="mb-6 text-lg font-semibold text-gray-800 text-center">
          Total Fees: <span className="text-secondary">${camp.campFees}</span>
        </h3>
        <div className="mb-4">
          <CardElement
            className="border px-4 py-3 rounded-lg border-secondary focus:border-primary transition-all"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                  iconColor: "#e53e3e",
                },
              },
            }}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}
        <div className="sm:flex justify-between items-center mt-6 gap-4 space-y-3 sm:space-y-0">
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
              processing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-secondary/85"
            }`}
          >
            {processing ? "Processing..." : "Submit Payment"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-4 rounded-lg text-white font-medium bg-red-500 hover:bg-red-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
