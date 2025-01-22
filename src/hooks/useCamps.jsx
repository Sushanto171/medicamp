import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
const useCamps = (props) => {
  const { home, sort, search, page = 0, available = false } = props;

  const axiosPublic = useAxiosPublic();
  const [totalData, setTotalData] = useState(0);
  const {
    data: camps = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["camps", page],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/camps?home=${home}&sort=${sort}&search=${search}&page=${page}&available=${available}`
      );
      setTotalData(data?.totalData);
      return data?.data;
    },
  });
  return { camps, isLoading, isError, error, refetch, totalData };
};

export default useCamps;
