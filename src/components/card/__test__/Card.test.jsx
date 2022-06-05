import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  let testData;
  beforeEach(() => {
    testData = [
      {
        dt: 100000,
        weather: [
          { icon: '04n', main: 'Clouds', description: 'overcast clouds' },
        ],
        main: {
          temp: 14,
          feels_like: 13,
        },
      },
    ];
  });

  test('should render correct weekday in black color (dt: 100000 => Fri Jan 02 1970 06:00)', () => {
    render(<Card data={testData} />);

    const weekday = screen.getByTestId('weekday');
    expect(weekday.textContent).toBe('Fr');
    expect(weekday.classList[1]).toBeUndefined();
  });

  test('should render correct weekday in red color (weekend) (dt: 100000 => Sat Jan 03 1970 10:00)', () => {
    testData[0].dt = 200000;
    render(<Card data={testData} />);

    const weekday = screen.getByTestId('weekday');
    expect(weekday.classList[1]).toBe('card__weekday_r');
  });

  test('should render correct time, day and month (dt: 100000 => Fri Jan 02 1970 06:00)', () => {
    render(<Card data={testData} />);

    const time = screen.getByTestId('time');
    expect(time.textContent).toBe('6:00 2 Jan');
  });

  test('should render correct icon', () => {
    render(<Card data={testData} />);

    const icon = screen.getByTestId('weather-icon');
    expect(icon.src).toBe('http://localhost/img/test.svg');
    expect(icon.alt).toBe('Clouds');
  });

  test('should render correct temp with the correct unit', () => {
    render(<Card data={testData} />);

    const temp = screen.getByTestId('temp');
    expect(temp.textContent).toBe('+14');
    expect(temp.classList[1]).toBe('card__temp-real_c');
    const feelsLike = screen.getByTestId('feels-like');
    expect(feelsLike.textContent).toBe('feels like +13');
  });

  test('should render correct temp if it is less than zero', () => {
    testData[0].main.temp = -14;
    render(<Card data={testData} />);

    const temp = screen.getByTestId('temp');
    expect(temp.textContent).toBe('-14');
    const feelsLike = screen.getByTestId('feels-like');
    expect(feelsLike.textContent).toBe('feels like +13');
  });

  test('should render correct unit from props', () => {
    render(
      <Card
        data={testData}
        unit="fahrenheit"
      />,
    );

    const temp = screen.getByTestId('temp');
    expect(temp.classList[1]).toBe('card__temp-real_f');
  });
});
