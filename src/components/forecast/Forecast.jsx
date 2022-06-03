/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import getWeatherData from '../../services/getWeatherData';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import Card from '../card/Card';
import './forecast.scss';

const Forecast = () => {
  const [searchText, setSearchText] = useState('');
  const [measure, setMeasure] = useState('celsius');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onBtnClick = async (e) => {
    e.preventDefault();

    if (searchText) {
      try {
        setError(false);
        setLoading(true);

        const answer = await getWeatherData(searchText, measure);
        if (answer.cod === '200') {
          const { list } = answer;
          setWeatherData(list.slice(0, 10));
          // setSearchText('');
        } else {
          throw new Error('city not found');
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setError(false);
    e.target.type === 'text' && setSearchText(e.target.value);
    e.target.type === 'radio' && setMeasure(e.target.value);
  };

  let content;

  if (error) {
    content =
      searchText === '' ? (
        <Error text="Enter the name of the locality" />
      ) : (
        <Error text="City not found" />
      );
  } else if (loading) {
    content = <Loading />;
  } else {
    content =
      JSON.stringify(weatherData) === '{}' ? '' : <Card data={weatherData} />;
  }

  return (
    <div className="forecast">
      <div className="forecast__content">
        <form
          action="#"
          className="forecast__form form"
        >
          <div className="form__search-panel">
            <input
              onChange={handleChange}
              value={searchText}
              className="form__text"
              type="text"
              name="city"
            />
            <button
              onClick={onBtnClick}
              className="form__btn"
              type="submit"
            >
              Search
            </button>
          </div>
          <div className="form__measure">
            <label
              className="form__label"
              htmlFor="celsius"
            >
              <input
                onChange={handleChange}
                className="form__radio"
                type="radio"
                name="measure"
                id="celsius"
                value="celsius"
                checked={measure === 'celsius'}
              />
              <span>Celsius</span>
            </label>
            <label
              className="form__label"
              htmlFor="fahrenheit"
            >
              <input
                onChange={handleChange}
                className="form__radio"
                type="radio"
                name="measure"
                id="fahrenheit"
                value="fahrenheit"
                checked={measure === 'fahrenheit'}
              />
              <span>Fahrenheit</span>
            </label>
          </div>
        </form>
        <div className="forecast__cards">{content}</div>
      </div>
    </div>
  );
};
export default Forecast;
