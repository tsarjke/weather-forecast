import { render, screen } from '@testing-library/react';
import Cards from '../Cards';

describe('Cards', () => {
  let testData;
  beforeEach(() => {
    testData = [
      {
        time: '2022-08-26 00:00',
        condition: {
          icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
          text: 'Partly cloudy',
        },
        temp_c: 14,
        feelslike_c: 13,
        temp_f: 14,
        feelslike_f: 13,
      },
    ];
  });

  test('should render correct weekday in black color (time: Fri Aug 26 2022 00:00)', () => {
    render(<Cards data={testData} />);

    const weekday = screen.getByTestId('weekday');
    expect(weekday.textContent).toBe('Fr');
    expect(weekday.classList[1]).toBeUndefined();
  });

  test('should render correct weekday in red color (weekend) (time: Fri Su 27 2022 00:00)', () => {
    testData[0].time = '2022-08-27 00:00';
    render(<Cards data={testData} />);

    const weekday = screen.getByTestId('weekday');
    expect(weekday.classList[1]).toBe('cards__weekday_r');
  });

  test('should render correct time, day and month (dt: 100000 => Fri Jan 02 1970 06:00)', () => {
    render(<Cards data={testData} />);

    const time = screen.getByTestId('time');
    expect(time.textContent).toBe('0:00 26 Aug');
  });

  test('should render correct icon', () => {
    render(<Cards data={testData} />);

    const icon = screen.getByTestId('weather-icon');
    expect(icon.src).toBe('http://cdn.weatherapi.com/weather/64x64/night/116.png');
    expect(icon.alt).toBe('Partly cloudy');
  });

  test('should render correct temp with the correct unit', () => {
    render(<Cards data={testData} />);

    const temp = screen.getByTestId('temp');
    expect(temp.textContent).toBe('+14');
    expect(temp.classList[1]).toBe('cards__temp-real_c');
    const feelsLike = screen.getByTestId('feels-like');
    expect(feelsLike.textContent).toBe('feels like +13');
  });

  test('should render correct temp if it is less than zero', () => {
    testData[0].temp_c = -14;
    render(<Cards data={testData} />);

    const temp = screen.getByTestId('temp');
    expect(temp.textContent).toBe('-14');
    const feelsLike = screen.getByTestId('feels-like');
    expect(feelsLike.textContent).toBe('feels like +13');
  });

  test('should render correct unit from props', () => {
    render(
      <Cards
        data={testData}
        unit="fahrenheit"
      />,
    );

    const temp = screen.getByTestId('temp');
    expect(temp.classList[1]).toBe('cards__temp-real_f');
  });
});
