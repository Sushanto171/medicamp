/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../page/shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin && !user) {
      navigate("/");
      return;
    }
  }, [isAdmin, user, navigate]);

  if (isLoading || loading) return <LoadingSpinner />;

  return children;
};

export default AdminRoute;
