import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('should render the header, main section and footer', () => {
    render(<App />);

    const appElem = screen.getByTestId('forecast');
    expect(appElem).toMatchSnapshot();
  });
});
