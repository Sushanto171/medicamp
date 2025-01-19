/* eslint-disable react/prop-types */
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutForm from "./../CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const PayModal = ({ camp, refetch }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={camp.paymentStatus}
        title={camp.paymentStatus ? "You already paid" : ""}
        className={`py-1 rounded-sm text-white ${
          camp.paymentStatus
            ? "cursor-not-allowed bg-gray-400 px-0.5"
            : "bg-secondary/60 hover:bg-secondary/85 px-2"
        }`}
      >
        {camp.paymentStatus ? "Paid" : "Pay"}
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-center block text-3xl mt-4">
          Payment Now
        </DialogHeader>
        <DialogBody>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                camp={camp}
                refetch={refetch}
                handleClose={handleOpen}
              />
            </Elements>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default PayModal;
