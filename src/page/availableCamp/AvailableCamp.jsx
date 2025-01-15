import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt } from "react-icons/tfi";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
import Container from "../../components/Container";
import { PopularCampsCard } from "../../components/PopularCampsCard";
import SectionTitle from "../../components/SectionTitle";
import useCamps from "../../hooks/useCamps";

const AvailableCamp = () => {
  const [sort, setSort] = useState("Sort");
  const [layout, setLayout] = useState(true);
  const { camps } = useCamps({ home: false });
  console.log(camps);
  return (
    <div className="">
      <nav className=" w-full bg-accent sticky top-0 backdrop-blur-md z-50">
        <Container>
          <div className="grid md:grid-cols-3 items-center h-full py-4 gap-2">
            {/* search flied */}
            <div className="relative overflow-hidden rounded-full">
              <input
                type="text"
                placeholder="Search on CampName, time, date"
                className="w-full shadow-2xl shadow-gray-700 p-2 pl-4 pr-20 rounded-full border border-primary/80 outline-0 placeholder:text-sm placeholder:text-text/60 text-text"
              />
              <button className="absolute top-0 right-0 w-16 h-11 flex items-center justify-center bg-primary/80 text-white text-3xl font-semibold">
                <CiSearch />
              </button>
            </div>
            <div></div>
            {/* sort */}
            <div className="flex justify-end gap-2">
              <Menu>
                <MenuHandler>
                  <Button
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
              <div className="py-2 bg-primary/70 rounded-full px-2 text-white flex items-center gap-2">
                <span className="font-semibold leading-tight tracking-tighter uppercase text-sm">
                  Layout
                </span>
                <Button
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
                  variant="text"
                  title="3 column"
                  onClick={() => setLayout(true)}
                  className={`w-fit p-2 rounded-full hover:bg-accent ${
                    layout ? "bg-accent" : "bg-secondary/70"
                  }  text-white border-white border`}
                >
                  <TfiLayoutColumn3Alt />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </nav>
      <Container>
        {/* section title */}
        <SectionTitle title="All Available Camps" />
        {/* content section */}
        <div
          className={`grid ${
            layout ? "md:grid-cols-3" : "md:grid-cols-2"
          } sm:grid-cols-2  gap-8`}
        >
          {camps.map((camp) => (
            <PopularCampsCard key={camp._id} {...camp} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AvailableCamp;
