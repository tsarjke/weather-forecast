import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

const reqSvgs =
  process.env.NODE_ENV === 'test'
    ? ''
    : require.context('./img', true, /\.svg$/);
const svgs =
  process.env.NODE_ENV === 'test'
    ? [{ path: '04n.svg', file: './img/test.svg' }]
    : reqSvgs.keys().map((path) => ({ path, file: reqSvgs(path) }));

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

const Card = ({ data, unit }) => {
  const tempArr = data.map((el) => {
    const {
      dt,
      weather: [w],
      main,
    } = el;

    const date = new Date(dt * 1000);
    const cureentDay = date.getDay();
    const icon = svgs.filter(
      ({ path }) => path.match(/\d{2}[d|n]/)[0] === w.icon,
    );

    const temp = addSign(Math.round(main.temp));
    const feelsLike = addSign(Math.round(main.feels_like));

    return (
      <li
        className="card__list"
        key={dt}
      >
        <h2
          className={`card__weekday ${
            cureentDay === 0 || cureentDay === 6 ? 'card__weekday_r' : ''
          }`}
          data-testid="weekday"
        >
          {days[cureentDay]}
        </h2>
        <time
          className="card__time"
          data-testid="time"
        >
          {`${date.getHours()}:00 ${date.getDate()} ${months[date.getMonth()]}`}
        </time>
        <div className="card__icon">
          <img
            src={icon[0].file}
            alt={w.main}
            data-testid="weather-icon"
          />
        </div>
        <p className="card__desc">{w.description}</p>
        <div className="card__temp">
          <p
            className={`card__temp-real ${
              unit === 'celsius' ? 'card__temp-real_c' : 'card__temp-real_f'
            }`}
            data-testid="temp"
          >
            {temp}
          </p>
          <p
            className="card__feels-like"
            data-testid="feels-like"
          >
            {`feels like ${feelsLike}`}
          </p>
        </div>
      </li>
    );
  });

  return <ul className="card">{tempArr}</ul>;
};

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unit: PropTypes.string,
};

Card.defaultProps = {
  unit: 'celsius',
};

export default Card;
