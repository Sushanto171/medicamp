import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container";
import RecentCamps from "../../components/RecentCampsCard";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";

const RecentMedicalCamps = () => {
  const axiosPublic = useAxiosPublic();
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
        <SectionTitle title="Recent Medical Camps" />
        {/* cards section */}
        <div
          id="popular-camps"
          className="grid mt-12 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {camps.length > 0 &&
            camps.map((camp) => <RecentCamps key={camp._id} camp={camp} />)}
        </div>
      </Container>
    </>
  );
};

export default RecentMedicalCamps;
