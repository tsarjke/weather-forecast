import React, { useState } from 'react';
import getWeatherData from '../../services/getWeatherData';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import Card from '../card/Card';
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

        const answer = await getWeatherData(searchText, measure);
        if (answer.cod === '200') {
          const { list } = answer;
          setWeatherData(list.slice(0, 10));
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

  let content;

  const handleChange = ({ target }) => {
    setError(false);

    if (target.type === 'text') {
      setSearchText(target.value);
    }
    if (target.type === 'radio') {
      setMeasure(target.value);
    }

    if (weatherData.length > 0) {
      setWeatherData([]);
    }
  };

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
      weatherData.length === 0 ? (
        ''
      ) : (
        <Card
          data={weatherData}
          unit={measure}
        />
      );
  }

  return (
    <div className="forecast">
      <div className="forecast__content">
        <form
          onSubmit={onFormSubmit}
          action="#"
          className="forecast__form"
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
        <div className="forecast__content">{content}</div>
      </div>
    </div>
  );
};
export default Forecast;
