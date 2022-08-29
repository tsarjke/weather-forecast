/* eslint-disable arrow-body-style */
const getWeatherBy3Hours = (weatherByHoursArr) => {
  const currentDate = Date.now() / 1000;
  return weatherByHoursArr
    .filter((el, index) => index % 3 === 0 && el.time_epoch > currentDate);
};

const getForecastData = (weatherByDaysArr) => weatherByDaysArr
  .reduce((acc, dayWeather) => {
    acc.push(...getWeatherBy3Hours(dayWeather.hour));
    return acc;
  }, []).slice(0, 10);

export default getForecastData;
