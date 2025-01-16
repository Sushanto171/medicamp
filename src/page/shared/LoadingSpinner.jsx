import image from "../../assets/preloader-medicalist.gif";
const LoadingSpinner = () => {
  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center">
        <img className="max-w-56" src={image} alt="spinner" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
