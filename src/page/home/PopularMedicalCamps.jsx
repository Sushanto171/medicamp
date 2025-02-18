import { Button } from "@material-tailwind/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { PopularCampsCard } from "../../components/PopularCampsCard";
import SectionTitle from "../../components/SectionTitle";
import useCamps from "../../hooks/useCamps";

const PopularMedicalCamps = () => {
  const { camps } = useCamps({ home: true });

  return (
    <div className="py-12">
      <Container>
        <SectionTitle title="Popular Medical_ Camps" />
        {/* cards section */}
        <div
          id="popular-camps"
          className="grid mt-12 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {camps.map((camp) => (
            <PopularCampsCard key={camp._id} {...camp} />
          ))}
        </div>
        <div className="mt-12">
          {/* redirect to available page */}
          <Link to="/available-camps">
            <Button
              variant="text"
              size="lg"
              className="flex items-center gap-1 border border-b-4 border-accent group relative pr-12 dark:text-white hover:bg-accent/10"
            >
              See All Camps{" "}
              <IoIosArrowRoundForward className="text-2xl group-hover:right-3 absolute right-5 transition-all " />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default PopularMedicalCamps;
