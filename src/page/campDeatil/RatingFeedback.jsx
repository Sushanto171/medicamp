/* eslint-disable react/prop-types */
import { Rating, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";

const RatingFeedback = ({ camp }) => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedback", camp?._id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/feedback/${camp._id}`);
      return data?.data;
    },
  });
  const totalRating = feedbacks.reduce(
    (previous, rating) => previous + rating.rating,
    0
  );
  const totalVote = feedbacks.length || 0;
  const rating = isNaN(totalRating / totalVote)
    ? 0
    : +(totalRating / totalVote).toFixed(1);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="my-6">
        <h3 className="text-lg text-text truncate">
          Rating & Feedback of {camp.campName}
        </h3>
        <div className="flex items-center gap-2 font-bold text-blue-gray-500 mt-4">
          {rating}
          <Rating value={parseInt(rating)} readonly />
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            Based on {totalVote} Reviews
          </Typography>
        </div>
        {/* reviews */}
        {/* Reviews Section */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800">Reviews:</h4>
          {feedbacks.length > 0 ? (
            <div className="space-y-3 mt-4">
              {feedbacks.slice(0, 3).map((feedback) => (
                <div
                  key={feedback._id}
                  className="p-4 bg-white shadow rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Rating value={feedback.rating} readonly />
                    <span className="text-sm text-gray-600 font-medium">
                      {feedback.rating.toFixed(1)}
                    </span>
                  </div>
                  <h5 className="text-sm font-semibold text-gray-800 truncate">
                    {feedback?.name}
                  </h5>
                  <p className="text-sm text-gray-600 mt-2">
                    {feedback.feedback.slice(0, 100) || "No feedback provided."}
                    {feedback.feedback.length > 100 && "..."}
                    {feedback.feedback.length > 100 && (
                      <button>Reed more</button>
                    )}
                  </p>
                </div>
              ))}
              <div>
                {feedbacks?.length > 3 && (
                  <button className="border p-1 bg-accent/50 rounded">
                    Reed All Reviews
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No reviews available yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RatingFeedback;
