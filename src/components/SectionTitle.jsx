/* eslint-disable react/prop-types */
import "animate.css";
import PropTypes from "prop-types";
import useIntersectionObserver from "../hooks/useObserve";

const SectionTitle = ({ title, my, feedback = false, subTitle }) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={elementRef}
      className={`text-center   ${
        isVisible ? "animate__animated animate__fadeInUp" : ""
      }  my-${my || 10}  `}
    >
      <h2
        className={`${
          feedback ? "text-white" : "text-primary"
        } text-2xl sm:text-3xl md:text-4xl capitalize dark:text-white  font-semibold`}
      >
        {title}
      </h2>
      {subTitle && (
        <p
          className={`${
            feedback ? "text-white/80" : "text-gray-600"
          } text-lg mb-12 dark:text-gray-400 mt-2`}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
