import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDBUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userDB = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDB", user?.email],
    queryFn: async () => {
      console.log(user);
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data?.data;
    },
    enabled: !loading,
  });
  return { userDB, isLoading, refetch };
};

export default useDBUser;
