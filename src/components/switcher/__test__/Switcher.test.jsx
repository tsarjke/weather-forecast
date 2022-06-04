import { fireEvent, render, screen } from '@testing-library/react';
import Switcher from '../Switcher';

describe('Switcher', () => {
  let handleChange;
  beforeAll(() => {
    handleChange = jest.fn();
  });

  test('Celsius radio button should be checked by default', () => {
    render(<Switcher handleChange={handleChange} />);

    const celsiusRadioBtn = screen.getByTestId('celsius-btn');
    expect(celsiusRadioBtn.checked).toBeTruthy();
  });

  test('"value" radio button should be checked', () => {
    render(
      <Switcher
        handleChange={handleChange}
        value="fahrenheit"
      />,
    );

    const fahrenheitRadioBtn = screen.getByTestId('fahrenheit-btn');
    expect(fahrenheitRadioBtn.checked).toBeTruthy();
  });

  test('should correct change checked radio button', () => {
    render(<Switcher handleChange={handleChange} />);

    const fahrenheitRadioBtn = screen.getByTestId('fahrenheit-btn');
    expect(fahrenheitRadioBtn.checked).not.toBeTruthy();

    fireEvent.change(fahrenheitRadioBtn, { target: { checked: true } });
    expect(fahrenheitRadioBtn.checked).toBeTruthy();
  });

  test('should call the handleChange on radio button click', () => {
    render(<Switcher handleChange={handleChange} />);

    const fahrenheitRadioBtn = screen.getByTestId('fahrenheit-btn');
		fireEvent.click(fahrenheitRadioBtn);
    expect(handleChange).toBeCalled();
  });
});
