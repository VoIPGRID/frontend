import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading component that is used when asynchonizely loading a component.
 * @param {bool} isLoading - Show loading string when true.
 * @param {bool} error - Show error message when a component can't be loaded.
 */
const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool
};

LoadingComponent.defaultProps = {
  isLoading: false,
  error: false
};

export default LoadingComponent;
