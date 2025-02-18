import { Rating } from "@material-tailwind/react";
import { FaQuoteLeft } from "react-icons/fa";
import { FeedbackModal } from "./modal/FeadbackModal";

/* eslint-disable react/prop-types */
const FeedbackCard = ({ feedbackData }) => {
  const { name, feedback, rating, photo } = feedbackData;

  return (
    <div className="max-w-2xl cursor-grab mx-auto bg-white border border-gray-200 dark:bg-background-dark rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-center items-center bg-gray-100 p-4 dark:bg-background">
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
          {feedback.length > 100 ? `${feedback.slice(0, 185)}...` : feedback}
        </p>
        {feedback.length > 185 && (
          <FeedbackModal {...{ name, feedback, rating, photo }} />
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;
