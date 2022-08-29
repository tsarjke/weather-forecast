import React, { useState } from 'react';
import getWeatherData from '../../services/getWeatherData';
import getForecastData from '../../utils/getForecastData';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import Cards from '../cards/Cards';
import './forecast.scss';
import SearchPanel from '../searchPanel/SearchPanel';
import Switcher from '../switcher/Switcher';

const Forecast = () => {
  const [searchText, setSearchText] = useState('');
  const [measure, setMeasure] = useState('celsius');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (searchText) {
      try {
        setError(false);
        setLoading(true);

        const answer = await getWeatherData(searchText);
        if (answer.forecast) {
          const {
            forecast: { forecastday },
          } = answer;
          setWeatherData(getForecastData(forecastday));
        } else if (answer.error) {
          setError('City not found');
        } else {
          setError(
            'It is impossible to get the data, contact the copyright holder',
          );
        }
      } catch {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  let content;

  const handleChange = ({ target }) => {
    setError(false);

    if (target.type === 'text') {
      setSearchText(target.value);
      if (weatherData.length > 0) {
        setWeatherData([]);
      }
    }
    if (target.type === 'radio') {
      setMeasure(target.value);
    }
  };

  if (error) {
    content =
      searchText === '' ? (
        <Error text="Enter the name of the locality" />
      ) : (
        <Error text={error} />
      );
  } else if (loading) {
    content = <Loading />;
  } else {
    content =
      weatherData.length === 0 ? (
        ''
      ) : (
        <Cards
          data={weatherData}
          unit={measure}
        />
      );
  }

  return (
    <div
      className="forecast"
      data-testid="forecast"
    >
      <div className="forecast__content">
        <form
          onSubmit={onFormSubmit}
          action="#"
          className="forecast__form"
          data-testid="forecast-form"
        >
          <SearchPanel
            handleChange={handleChange}
            value={searchText}
          />
          <Switcher
            handleChange={handleChange}
            value={measure}
          />
        </form>
        <div
          className="forecast__content"
          data-testid="content"
        >
          {content}
        </div>
      </div>
    </div>
  );
};
export default Forecast;
