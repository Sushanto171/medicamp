/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const SectionTitle = ({ title, my, feedback = false }) => {
  return (
    <div
      className={`text-center font-semibold ${
        feedback ? "text-white" : "text-primary"
      } text-2xl sm:text-3xl md:text-4xl  dark:text-white my-${
        my || 10
      } capitalize`}
    >
      <h2>{title}</h2>
    </div>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
