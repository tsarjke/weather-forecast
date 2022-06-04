import React from 'react';
import PropTypes from 'prop-types';
import './error.scss';

const Error = ({ text }) => (
  <div className="error" data-testid="error">
    <div className="error__content">
      <h2 className="error__title">Error!</h2>
      <p className="error__text">{text}</p>
    </div>
  </div>
);

Error.propTypes = {
  text: PropTypes.string,
};

Error.defaultProps = {
  text: 'Something went wrong',
};

export default Error;
