import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="max-w-screen-xl mx-auto px-2 sm:px-0">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
