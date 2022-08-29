const getWeatherData = async (city) => {
  if (city) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    const q = encodeURI(city.toLowerCase().replace('-', ' '));

    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${q}&days=3`,
        options,
      );
      if (response) {
        return await response.json();
      }
    } catch {
      throw new Error('Failed to load data');
    }
  }

  return null;
};

export default getWeatherData;
