import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
    return;
  }

  return children;
};

export default PrivateRoute;
