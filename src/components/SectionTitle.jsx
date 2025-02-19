/* eslint-disable react/prop-types */
import "animate.css";
import PropTypes from "prop-types";
import useIntersectionObserver from "../hooks/useObserve";

const SectionTitle = ({ title, my, feedback = false }) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={elementRef}
      className={`text-center font-semibold  ${
        feedback ? "text-white" : "text-primary"
      } text-2xl sm:text-3xl md:text-4xl ${
        isVisible ? "animate__animated animate__fadeInUp" : ""
      } dark:text-white my-${my || 10} capitalize `}
    >
      <h2>{title}</h2>
    </div>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
