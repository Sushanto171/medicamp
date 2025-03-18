import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container";
import RecentCamps from "../../components/RecentCampsCard";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useIntersectionObserver from "../../hooks/useObserve";
import LoadingSpinner from "../shared/LoadingSpinner";

const RecentMedicalCamps = () => {
  const axiosPublic = useAxiosPublic();
  const { elementRef, isVisible } = useIntersectionObserver(0);
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["recentCamps"],
    queryFn: async () => {
      const res = await axiosPublic("/recent-camps");
      return res?.data?.data;
    },
  });

  if (isLoading) {
    <LoadingSpinner />;
    return;
  }
  return (
    <>
      <Container>
        <SectionTitle title="Recent Medical_ Camps" />
        {/* cards section */}
        <div
          ref={elementRef}
          id="popular-camps"
          className={`grid mt-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center ${
            isVisible ? "contentVisible" : ""
          }`}
        >
          {camps.length > 0 &&
            camps.map((camp) => <RecentCamps key={camp._id} camp={camp} />)}
        </div>
      </Container>
    </>
  );
};

export default RecentMedicalCamps;
