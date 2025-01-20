import { Rating } from "@material-tailwind/react";
import { FaQuoteLeft } from "react-icons/fa";

/* eslint-disable react/prop-types */
const FeedbackCard = ({ feedbackData }) => {
  const { name, feedback, rating, photo } = feedbackData;

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-center items-center bg-gray-100 p-4 ">
        <img
          className="w-20 max-w-20 h-20 rounded-full border-4 border-secondary"
          src={photo}
          alt={name}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {name}
        </h2>
        <div className="text-sm text-gray-500 text-center mt-2">
          <Rating value={rating} readonly />
        </div>
        <p className="flex justify-center my-3 text-text/60">
          <FaQuoteLeft className="text-2xl" />
        </p>
        <p className="text-sm text-gray-600 mt-4 flex text-center relative ">
          {feedback.length > 100 ? `${feedback.slice(0, 100)}...` : feedback}
        </p>
        {feedback.length > 100 && (
          <button className="mt-4 text-secondary hover:underline text-sm">
            Read More
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;
