import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxiosSecure = () => {
  const { signOutUser, setLoading } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers = { Authorization: `Bearer ${token}` };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (data) => {
      return data;
    },
    (error) => {
      if (error) {
        // check 401 and 403 status
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          signOutUser();
          navigate("/join-us");
          setLoading(false);
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
