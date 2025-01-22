import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useDBUser from "./useDBUser";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const { userDB } = useDBUser();

  const axiosSecure = useAxiosSecure();
  const {
    data: isAdmin = false,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      if (user) {
        const { data } = await axiosSecure(
          `/admin/${user?.email || userDB?.email}`
        );
        return data?.data;
      }
    },
    enabled: !loading,
  });
  return { isAdmin, isLoading, error };
};

export default useAdmin;
