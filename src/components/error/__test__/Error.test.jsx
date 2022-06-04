import { render, screen } from '@testing-library/react';
import Error from '../Error';

describe('Error', () => {
  test('should render this component with the props text', () => {
    render(<Error text="test error" />);

    const errorElem = screen.getByTestId('error');
    expect(errorElem).toMatchSnapshot();
  });
});
