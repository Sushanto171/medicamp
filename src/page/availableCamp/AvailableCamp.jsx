import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt } from "react-icons/tfi";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuArrowDownUp } from "react-icons/lu";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";
import { PopularCampsCard } from "../../components/PopularCampsCard";
import SectionTitle from "../../components/SectionTitle";
import useCamps from "../../hooks/useCamps";
import useIntersectionObserver from "../../hooks/useObserve";
import { scrollToTop } from "../../utilities/utilities";
import LiveSearch from "../shared/LiveSearch";
import LoadingSpinner from "./../shared/LoadingSpinner";

const AvailableCamp = () => {
  const [sort, setSort] = useState("Sort");
  const [layout, setLayout] = useState(true);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { elementRef, isVisible } = useIntersectionObserver(0);

  const { camps, refetch, isLoading, totalData } = useCamps({
    home: false,
    sort,
    search,
    page: currentPage - 1,
    available: true,
  });

  useEffect(() => {
    refetch();

    if (sort !== "Sort") {
      toast.success(`Successfully sorted by ${sort}`);
    }
    scrollToTop();
  }, [sort, refetch]);

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className="pb-12">
      <nav className=" w-full bg-accent sticky top-0 backdrop-blur-md z-50">
        <Container>
          <div className="grid md:grid-cols-3 items-center h-full py-4 gap-2">
            {/* search flied */}
            <LiveSearch
              data={camps}
              refetch={refetch}
              searchKey={setSearch}
              keywordName={"available"}
              handleLoading={setLoading}
            />
            <div></div>
            {/* sort */}
            <div
              className={`flex justify-end gap-2   ${
                camps.length === 0 ? "cursor-not-allowed" : ""
              }`}
            >
              <Menu>
                <MenuHandler>
                  <Button
                    disabled={camps.length <= 1}
                    title="Sort"
                    className="relative w-40 p rounded-full bg-primary/70 border-secondary pl-2 whitespace-nowrap"
                  >
                    {sort}
                    <span className="absolute right-3 text-lg">
                      <LuArrowDownUp />
                    </span>
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => setSort("Most Registered")}>
                    Most Registered
                  </MenuItem>
                  <MenuItem onClick={() => setSort("Camp Fees")}>
                    Camp Fees
                  </MenuItem>
                  <MenuItem
                    className="text-sm"
                    title="Camp Name"
                    onClick={() => setSort("A-Z Order")}
                  >
                    A-Z Order
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* layout */}
              <div className="py-2 hidden  bg-primary/70 rounded-full px-2 text-white sm:flex items-center gap-2">
                <span className="font-semibold leading-tight tracking-tighter uppercase text-sm">
                  Layout
                </span>
                <Button
                  disabled={camps.length <= 1}
                  variant="text"
                  title="2 column"
                  onClick={() => setLayout(false)}
                  className={`w-fit p-2 rounded-full hover:bg-accent ${
                    layout ? "bg-secondary/70" : "bg-accent"
                  }  text-white border-white border`}
                >
                  <TfiLayoutColumn2Alt />
                </Button>
                <Button
                  disabled={camps.length <= 1}
                  variant="text"
                  title="3 column"
                  onClick={() => setLayout(true)}
                  className={`w-fit p-2 rounded-full hover:bg-accent ${
                    layout ? "bg-accent" : "bg-secondary/70"
                  }  text-white border-white border ${
                    camps.length === 0 ? "cursor-not-allowed" : ""
                  }`}
                >
                  <TfiLayoutColumn3Alt />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </nav>
      <Container>
        <div className="mt-8">
          {/* section title */}
          <SectionTitle title="All Available Camps" />
          {/* content section */}
          <div
            ref={elementRef}
            className={`grid ${
              layout
                ? "lg:grid-cols-4 opacity-0 md:grid-cols-3 gap-4"
                : "md:grid-cols-2 gap-8 "
            } sm:grid-cols-2  mt-12 ${isVisible ? "contentVisible" : ""} `}
          >
            {camps.length === 0 ? (
              <>
                <h3>No camp Available.</h3>
              </>
            ) : (
              camps.map((camp) => <PopularCampsCard key={camp._id} {...camp} />)
            )}
          </div>
          {totalData > 12 && (
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalData={totalData}
              available={true}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default AvailableCamp;
