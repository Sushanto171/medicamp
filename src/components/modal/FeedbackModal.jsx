/* eslint-disable react/prop-types */
import { Button, Dialog, Rating } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export function FeedbackModal({ camp }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [rating, setRating] = useState(4);
  const handleFeedback = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const name = formData.name.value;
    const feedback = formData.feedback.value;
    const feedbackInfo = {
      name,
      feedback,
      rating,
      campID: camp.campID,
    };
    try {
      const { data } = await axiosSecure.post("/feedback", feedbackInfo);
      handleOpen();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={!camp.paymentStatus && !camp.confirmationStatus}
        title={"Write feedback for better improvement"}
        className={`ml-2 px-0.5 py-1 rounded-sm text-white bg-secondary/60 text-sm hover:bg-secondary/85`}
      >
        Feedback
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-y-auto w-44 relative"
      >
        <div className="absolute right-5 top-3">
          <Button
            size="sm"
            className="bg-gray-200 hover:border-secondary border-transparent border text-secondary text-md w-6 h-8 flex justify-center items-center"
            onClick={handleOpen}
          >
            X
          </Button>
        </div>
        <form
          onSubmit={handleFeedback}
          className=" mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            We Value Your Feedback
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Share your experience with us!
          </p>

          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user?.displayName}
              placeholder="Enter your name"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Feedback Input */}
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              placeholder="Write your feedback here..."
              rows="3"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            ></textarea>
          </div>

          {/* Rating Input */}
          <div>
            <p className="text-text">Rating</p>
            <Rating onChange={(value) => setRating(value)} value={rating} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all"
          >
            Submit Feedback
          </button>
        </form>
      </Dialog>
    </>
  );
}
