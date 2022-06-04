import { render, screen } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact', () => {
  test('should render this component without any mistakes', () => {
    render(<Contact />);

    const contactElem = screen.getByTestId('contact');
    expect(contactElem).toMatchSnapshot();
  });
});
