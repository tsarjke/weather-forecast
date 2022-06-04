import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  test('should render this component without any mistakes', () => {
    render(<Loading />);

    const loadingElem = screen.getByTestId('loading');
    expect(loadingElem).toMatchSnapshot();
  });
});
