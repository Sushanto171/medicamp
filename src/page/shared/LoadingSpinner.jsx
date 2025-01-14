import PropTypes from "prop-types";
import { BiPlusMedical } from "react-icons/bi";
import image from "../../assets/preloader-medicalist.gif";
import useAuth from "../../hooks/useAuth";
const LoadingSpinner = ({ auth }) => {
  const { loading } = useAuth();
  return (
    <div>
      {auth ? (
        <div className={loading ? "" : "hidden"}>
          <BiPlusMedical className="animate-spin size-4" />
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <img src={image} alt="spinner" />
        </div>
      )}
    </div>
  );
};
LoadingSpinner.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
