import { useEffect } from "react";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { scrollToTop } from "../utilities/utilities";

/* eslint-disable react/prop-types */
const Pagination = ({
  setCurrentPage,
  currentPage,
  totalData = 0,
  available = false,
}) => {
  const totalPage = +Math.ceil(totalData / 10);

  const array = Array.from({ length: totalPage });
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);
  return (
    <div className="flex items-center justify-between my-8 dark:text-gray-200">
      <p className="text-xs sm:text-base">
        Showing {currentPage * 10 - 9}-{" "}
        {available
          ? totalData < 12
            ? totalData
            : currentPage * 12
          : currentPage === totalPage
          ? totalData
          : currentPage * 10}{" "}
        of {totalData}
      </p>
      <div className="w-fit border rounded-md overflow-hidden flex scale-75 sm:scale-100">
        {/* Previous button */}
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => (prev > 2 ? prev - 1 : 1))}
          className="border w-8 h-8 flex items-center disabled:text-gray-400 justify-center hover:bg-secondary disabled:hover:bg-transparent disabled:cursor-not-allowed hover:text-white"
        >
          <TbPlayerTrackPrev />
        </button>
        {array.map((_, i) => (
          <button
            onClick={(e) => setCurrentPage(e.target.value)}
            className={`border w-8 h-8 ${
              currentPage == i + 1 ? "bg-secondary text-white" : ""
            } `}
            value={i + 1}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        {/* Next button */}
        <button
          disabled={totalPage == currentPage}
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPage ? prev + 1 : totalPage))
          }
          className="border w-8 h-8 flex items-center justify-center disabled:text-gray-500 hover:bg-secondary hover:text-white disabled:hover:bg-transparent disabled:cursor-not-allowed"
        >
          <TbPlayerTrackNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
