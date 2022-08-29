import React from 'react';
import PropTypes from 'prop-types';
import './cards.scss';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const addSign = (val) => {
  let temp;
  if (val > 0) {
    temp = `+${val}`;
  } else if (val < 0) {
    temp = val;
  }
  return temp;
};

const Cards = ({ data, unit }) => {
  const tempArr = data.map((el) => {
    const {
      time,
      condition: { icon, text },
    } = el;

    const date = new Date(time);
    const cureentDay = date.getDay();

    const temp = addSign(
      Math.round(unit === 'celsius' ? el.temp_c : el.temp_f),
    );
    const feelsLike = addSign(
      Math.round(unit === 'celsius' ? el.feelslike_c : el.feelslike_f),
    );

    return (
      <li
        className="cards__elem"
        key={time}
      >
        <h2
          className={`cards__weekday ${
            cureentDay === 0 || cureentDay === 6 ? 'cards__weekday_r' : ''
          }`}
          data-testid="weekday"
        >
          {days[cureentDay]}
        </h2>
        <time
          className="cards__time"
          data-testid="time"
        >
          {`${date.getHours()}:00 ${date.getDate()} ${months[date.getMonth()]}`}
        </time>
        <div className="cards__icon">
          <img
            src={icon}
            alt={text}
            data-testid="weather-icon"
          />
        </div>
        <p className="cards__desc">{text}</p>
        <div className="cards__temp">
          <p
            className={`cards__temp-real ${
              unit === 'celsius' ? 'cards__temp-real_c' : 'cards__temp-real_f'
            }`}
            data-testid="temp"
          >
            {temp}
          </p>
          <p
            className="cards__feels-like"
            data-testid="feels-like"
          >
            {`feels like ${feelsLike}`}
          </p>
        </div>
      </li>
    );
  });

  return <ul className="cards">{tempArr}</ul>;
};

Cards.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unit: PropTypes.string,
};

Cards.defaultProps = {
  unit: 'celsius',
};

export default Cards;
