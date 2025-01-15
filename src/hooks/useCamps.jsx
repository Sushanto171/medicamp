import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useCamps = ({ home }) => {
  const axiosPublic = useAxiosPublic();
  console.log(home);
  const {
    data: camps = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/camps?home=${home}`);
      return data?.data;
    },
  });
  return { camps, isLoading, isError, error };
};

export default useCamps;
