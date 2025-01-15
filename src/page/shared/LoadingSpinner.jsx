import PropTypes from "prop-types";
import image from "../../assets/preloader-medicalist.gif";
const LoadingSpinner = () => {
  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center">
        <img src={image} alt="spinner" />
      </div>
    </div>
  );
};
LoadingSpinner.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
