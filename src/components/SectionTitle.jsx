/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const SectionTitle = ({ title, my = 12 }) => {
  return (
    <div
      className={`text-center font-semibold text-2xl sm:text-3xl md:text-4xl text-text my-${my} uppercase`}
    >
      <h2>{title}</h2>
    </div>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
