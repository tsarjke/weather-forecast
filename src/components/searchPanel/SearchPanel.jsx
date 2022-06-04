import React from 'react';
import PropTypes from 'prop-types';
import './searchPanel.scss';

const SearchPanel = ({ handleChange, value }) => (
  <div className="search">
    <input
      onChange={handleChange}
      value={value}
      className="search__text-input"
      type="text"
      name="city"
      data-testid="search-input"
    />
    <button
      className="search__btn"
      type="submit"
      data-testid="search-btn"
    >
      Search
    </button>
  </div>
);

SearchPanel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SearchPanel.defaultProps = {
  value: '',
};

export default SearchPanel;
