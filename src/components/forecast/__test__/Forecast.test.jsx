import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Forecast from '../Forecast';
import mockGetWeatherData from '../../../services/getWeatherData';

jest.mock('../../../services/getWeatherData.js');

const testData = [
  {
    dt: 100000,
    weather: [{ icon: '04n', main: 'Clouds', description: 'overcast clouds' }],
    main: {
      temp: 14,
      feels_like: 13,
    },
  },
];

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
    mockGetWeatherData.mockResolvedValue({ cod: '404' });
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

  test('Should show the Error component with "Something went wrong" when there was no list in the response', async () => {
    mockGetWeatherData.mockResolvedValue({ cod: '200' });
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

  test('Should render the test card and delete it after changing in search input', async () => {
    mockGetWeatherData.mockResolvedValue({ cod: '200', list: testData });
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(screen.queryByText('overcast clouds')).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Phoenix' } });
    expect(screen.queryByText('overcast clouds')).not.toBeInTheDocument();
  });

  test('Should render the test card and delete it after changing radio button with the unit', async () => {
    mockGetWeatherData.mockResolvedValue({ cod: '200', list: testData });
    render(<Forecast />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'San-francisco' } });

    await act(async () => {
      const forecastForm = screen.getByTestId('forecast-form');
      fireEvent.submit(forecastForm);
    });

    expect(screen.queryByText('overcast clouds')).toBeInTheDocument();
    const fahrenheitRadioBtn = screen.getByTestId('fahrenheit-btn');
    fireEvent.click(fahrenheitRadioBtn);
    expect(screen.queryByText('overcast clouds')).not.toBeInTheDocument();
  });
});
