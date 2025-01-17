/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../page/shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (user) {
    children;
    return children;
  }

  if (loading) return <LoadingSpinner />;
  return <Navigate to={"/"} />;
};

export default PrivateRoute;
