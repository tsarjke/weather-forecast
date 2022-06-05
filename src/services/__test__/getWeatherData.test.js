import getWeatherData from '../getWeatherData';

global.fetch = jest.fn();

describe('getWeatherData', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cod: '200' }),
      }),
    );
  });

  test("The return value should be null if the function was called without any arguments (city). And fetch should't be called", async () => {
    const res = await getWeatherData();
    expect(res).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  test('Should get the object from "server" when evrething is ok', async () => {
    const res = await getWeatherData('San-Francisco');
    expect(res).toStrictEqual({ cod: '200' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Should throw error when the request failed', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(),
      }),
    );

    await expect(getWeatherData('San-Francisco')).rejects.toThrow(
      'Failed to load data',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Should change the unit from metric (Celsius) to imperial (Fahrenheit) when function was called with some second argument', async () => {
    const res = await getWeatherData('San-Francisco', 'fahrenheit');
    expect(res).toStrictEqual({ cod: '200' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Should return null in case of missing data', async () => {
    global.fetch = jest.fn(() => Promise.resolve(null));

    expect(await getWeatherData('San-Francisco')).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
