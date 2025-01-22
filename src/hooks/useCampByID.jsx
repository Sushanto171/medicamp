import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCampByID = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: camp = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["camp-details", id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/camp/${id}`);
      return data?.data;
    },
    enabled: !!id,
  });
  return { camp, refetch, isLoading };
};

export default useCampByID;
