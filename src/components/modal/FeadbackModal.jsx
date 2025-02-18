/* eslint-disable react/prop-types */
import { Button, Dialog, Rating } from "@material-tailwind/react";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export function FeedbackModal({ name, feedback, rating, photo }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        onClick={handleOpen}
        className="mt-4 text-secondary dark:text-accent font-bold text-base hover:underline "
      >
        Read More
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-y-auto h-96 dark:bg-background-dark relative"
      >
        <div className="flex justify-end absolute top-4 right-4">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="text-lg p-2"
          >
            <span>X</span>
          </Button>
        </div>
        <div className="flex justify-center items-center bg-gray-100 p-4 dark:bg-background ">
          <img
            className="w-20 max-w-20 h-20 rounded-full border-4 border-secondary"
            src={photo}
            alt={name}
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
            {name}
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-200 text-center mt-2">
            <Rating value={rating} readonly />
          </div>
          <p className="flex justify-center my-3 text-text/60">
            <FaQuoteLeft className="text-2xl dark:text-accent" />
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-4 flex text-center relative ">
            {feedback}
          </p>
        </div>
      </Dialog>
    </>
  );
}
