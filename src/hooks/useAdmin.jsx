import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: isAdmin = null,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/admin/${user?.email}`);
      return data?.data;
    },
    enabled: !loading,
  });
  return { isAdmin, isLoading, error };
};

export default useAdmin;
