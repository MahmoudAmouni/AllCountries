
import PropTypes from 'prop-types';

const MyComponent = ({ id1 }) => {
  // Your component logic here
  return <div id={id1}>...</div>;
};

MyComponent.propTypes = {
  id1: PropTypes.string.isRequired, // Define the prop type
};

export default MyComponent;