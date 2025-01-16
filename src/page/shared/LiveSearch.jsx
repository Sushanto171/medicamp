import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

const LiveSearch = ({ data }) => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [match, setMatch] = useState("");
  const [click, setClick] = useState(false);
  const palletRef = useRef(null);

  let keyword = [];
  for (const camp of data) {
    keyword.push(camp.campName);
    keyword.push(camp.location);
    keyword.push(camp.date);
    keyword.push(camp.healthcareProfessional);
  }

  useEffect(() => {
    if (search) {
      setMatch(
        keyword.filter((key) =>
          key.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (!search) {
      setMatch("");
    }
  }, [search]);
  useEffect(() => {
    if (select) {
      setSearch(select);
    }
  }, [select]);
  console.log(select);
  useEffect(() => {
    if (click) {
      palletRef.current.focus;
    }
  }, [click]);
  return (
    <div className="relative  rounded-full">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setClick(true)}
        onBlur={() => setTimeout(() => setClick(false), 500)}
        placeholder="Search here.."
        className="w-full group shadow-2xl shadow-gray-700 p-2 pl-4 pr-20 rounded-full border border-primary/80 outline-0 placeholder:text-sm placeholder:text-text/60 text-text"
      />
      <button className="absolute top-0 right-0 w-16 h-[41px] flex items-center justify-center rounded-r-full bg-primary/80 text-white text-3xl font-semibold">
        <CiSearch />
      </button>
      {/* suggest  or keyword*/}
      <div
        tabIndex={0}
        ref={palletRef}
        className={`absolute z-100 bg-white w-[90%] rounded-b-2xl  mx-auto top-[42px] left-0 right-0 h-fit max-h-36 overflow-x-auto shadow-md ${
          click ? "" : "hidden"
        }`}
      >
        <ul className="overflow-hidden rounded-b-2xl bg-gray-50">
          {/* suggest */}
          {match ? (
            <>
              <li
                className={`text-text font-medium bg-gray-300 px-3 py-1 ${
                  match.length === 0 ? "hidden" : ""
                } `}
              >
                Suggest:
              </li>
              {match.map((key, i) => (
                <li
                  onClick={(e) => setSelect(e.target.innerHTML)}
                  value={key}
                  className="border-b py-0.5 text-text text-sm cursor-pointer px-3 hover:bg-gray-200 truncate"
                  key={i}
                >
                  {key}
                </li>
              ))}
            </>
          ) : (
            // keyword
            <>
              <li className="text-text font-medium bg-gray-300 px-3 py-1 ">
                Keyword:
              </li>
              {keyword.map((key, i) => (
                <li
                  onClick={(e) => setSelect(e.target.innerHTML)}
                  value={key}
                  className="border-b py-0.5 text-text text-sm cursor-pointer px-3 hover:bg-gray-200 truncate"
                  key={i}
                >
                  {key}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
LiveSearch.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LiveSearch;
