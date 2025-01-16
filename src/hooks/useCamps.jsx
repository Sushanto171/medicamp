import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useCamps = (props) => {
  const { home, sort } = props;

  const axiosPublic = useAxiosPublic();

  const {
    data: camps = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/camps?home=${home}&sort=${sort}`);
      return data?.data;
    },
  });
  return { camps, isLoading, isError, error, refetch };
};

export default useCamps;
