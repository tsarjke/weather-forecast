import React from 'react';
import PropTypes from 'prop-types';
import './switcher.scss';

const Switcher = ({ handleChange, value }) => (
  <div className="switcher">
    <div className="switcher__content">
      <label
        className="switcher__label"
        htmlFor="celsius"
      >
        <input
          onChange={handleChange}
          className="switcher__radio"
          type="radio"
          name="measure"
          id="celsius"
          value="celsius"
          checked={value === 'celsius'}
        />
        <span>Celsius</span>
      </label>
      <label
        className="switcher__label"
        htmlFor="fahrenheit"
      >
        <input
          onChange={handleChange}
          className="switcher__radio"
          type="radio"
          name="measure"
          id="fahrenheit"
          value="fahrenheit"
          checked={value === 'fahrenheit'}
        />
        <span>Fahrenheit</span>
      </label>
    </div>
  </div>
);

Switcher.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Switcher.defaultProps = {
  value: 'celsius',
};

export default Switcher;
