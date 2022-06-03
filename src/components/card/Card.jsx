import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

const reqSvgs = require.context('./img', true, /\.svg$/);
const svgs = reqSvgs.keys().map((path) => ({ path, file: reqSvgs(path) }));

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
    temp = `-${val}`;
  }
  return temp;
};

const Card = ({ data }) => {
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
        >
          {days[cureentDay]}
        </h2>
        <div className="card__date">
          <h4 className="card__time">{`${date.getHours()}:00`}</h4>
          <h4 className="card__date-month">{`${date.getDate()} ${months[date.getMonth()]}`}</h4>
        </div>
        <div className="card__icon">
          <img
            src={icon[0].file}
            alt={w.main}
          />
        </div>
        <p className="card__desc">{w.description}</p>
        <div className="card__temp">
          <p className="card__temp-real">{temp}</p>
          <p className="card__feels-like">{`feels like ${feelsLike}`}</p>
        </div>
      </li>
    );
  });

  return <ul className="card">{tempArr}</ul>;
};

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Card;
