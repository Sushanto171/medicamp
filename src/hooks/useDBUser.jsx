import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDBUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userDB = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDB", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data?.data;
    },
  });
  return { userDB, isLoading, refetch };
};

export default useDBUser;
