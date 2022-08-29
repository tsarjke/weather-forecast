import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Forecast from '../Forecast';
import mockGetWeatherData from '../../../services/getWeatherData';

jest.mock('../../../services/getWeatherData.js');

const testData = {
  time: '2022-08-29 00:00',
  condition: {
    icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
    text: 'Partly cloudy',
  },
  temp_c: 14,
  feelslike_c: 13,
  temp_f: 14,
  feelslike_f: 13,
};

const mockTestData = {
  forecast: {
    forecastday: [
      {
        hour: [{ ...testData, time_epoch: Infinity }],
      },
    ],
  },
};

describe('Forecast', () => {
  test('should render form and empty div for content', () => {
    render(<Forecast />);

    const forecastElem = screen.getByTestId('forecast');
    expect(forecastElem).toMatchSnapshot();
  });

  test('should render the Error component and ask to write comething in search input as search input is empty', () => {
    render(<Forecast />);

    const forecastForm = screen.getByTestId('forecast-form');
    fireEvent.submit(forecastForm);
    expect(
      screen.getByText('Enter the name of the locality'),
    ).toBeInTheDocument();
  });

  test('Should show the Error component with "City not found" when the 404 cod is received', async () => {
    mockGetWeatherData.mockResolvedValue({
      error: { code: 1006, message: 'No matching location found.' },
    });
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(screen.getByText('City not found')).toBeInTheDocument();
    expect(mockGetWeatherData).toHaveBeenCalledTimes(1);
  });

  test('Should show the Error component with "It is impossible to get the data, contact the copyright holder" when access denied (403)', async () => {
    mockGetWeatherData.mockResolvedValue({ message: 'problem' });
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(
      screen.getByText(
        'It is impossible to get the data, contact the copyright holder',
      ),
    ).toBeInTheDocument();
    expect(mockGetWeatherData).toHaveBeenCalledTimes(1);
  });

  test('Should show the Error component with "Something went wrong" when a rejection is received', async () => {
    mockGetWeatherData.mockRejectedValue();
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(mockGetWeatherData).toHaveBeenCalledTimes(1);
  });

  test('Should show the Error component with "It is impossible to get the data, contact the copyright holder" when there was no data in the response', async () => {
    mockGetWeatherData.mockResolvedValue({ cod: '200' });
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(
      screen.getByText(
        'It is impossible to get the data, contact the copyright holder',
      ),
    ).toBeInTheDocument();
    expect(mockGetWeatherData).toHaveBeenCalledTimes(1);
  });

  test('Should render the test card and delete it after changing in search input', async () => {
    mockGetWeatherData.mockResolvedValue(mockTestData);
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(screen.queryByText('Partly cloudy')).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Phoenix' } });
    expect(screen.queryByText('Partly cloudy')).not.toBeInTheDocument();
  });
});
