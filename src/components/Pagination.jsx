import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

/* eslint-disable react/prop-types */
const Pagination = ({ setCurrentPage, currentPage, totalData = 0 }) => {
  const totalPage = +Math.round(totalData / 10);

  const array = Array.from({ length: totalPage });
  return (
    <div className="flex items-center justify-between my-8">
      <p className="text-xs sm:text-base">
        Showing {currentPage * 10 - 9}-
        {currentPage === totalPage ? totalData : currentPage * 10} of{" "}
        {totalData}
      </p>
      <div className="w-fit border rounded-md overflow-hidden flex scale-75 sm:scale-100">
        <button
          onClick={() => setCurrentPage((prev) => (prev > 2 ? prev - 1 : 1))}
          className="border w-8 h-8 flex items-center justify-center hover:bg-secondary hover:text-white"
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
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPage ? prev + 1 : totalPage))
          }
          className="border w-8 h-8 flex items-center justify-center hover:bg-secondary hover:text-white"
        >
          <TbPlayerTrackNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
