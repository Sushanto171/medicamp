/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const SectionTitle = ({ title, my }) => {
  return (
    <div
      className={`text-center font-semibold text-2xl sm:text-3xl md:text-4xl text-primary  my-${
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
