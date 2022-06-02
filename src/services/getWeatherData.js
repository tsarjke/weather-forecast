const getWeatherData = async (city, measure = 'celsius') => {
  if (city) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '2db4b99962msh1c700d41264f9ffp1963c6jsn86589c0dc4af',
      },
    };

    const units = measure !== 'celsius' ? 'imperial' : 'metric';
    const q = encodeURI(city.toLowerCase().replace('-', ' '));

    try {
      const response = await fetch(
        `https://community-open-weather-map.p.rapidapi.com/forecast?q=${q}&units=${units}`,
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
