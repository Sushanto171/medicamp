import { Button } from "@material-tailwind/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "../../components/Container";
import { PopularCampsCard } from "../../components/PopularCampsCard";
import SectionTitle from "../../components/SectionTitle";
import useCamps from "../../hooks/useCamps";

const PopularMedicalCamps = () => {
  const { camps } = useCamps({ home: true });
  console.log(camps);
  return (
    <>
      <Container>
        <SectionTitle title="Popular Medical Camps" />
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {camps.map((camp) => (
            <PopularCampsCard key={camp._id} {...camp} />
          ))}
        </div>
        <div className="mt-12">
          <Button
            variant="text"
            size="lg"
            className="flex items-center gap-1 border border-b-4 border-accent group relative pr-12"
          >
            See More{" "}
            <IoIosArrowRoundForward className="text-2xl group-hover:right-3 absolute right-5 transition-all " />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default PopularMedicalCamps;
