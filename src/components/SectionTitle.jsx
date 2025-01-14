import PropTypes from "prop-types";

const SectionTitle = ({ title }) => {
  return (
    <div className="text-center font-semibold text-3xl text-text">
      <h2>{title}</h2>
    </div>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
