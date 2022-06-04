import { fireEvent, render, screen } from '@testing-library/react';
import SearchPanel from '../SearchPanel';

describe('SearchPanel', () => {
  let handleChange;
  beforeAll(() => {
    handleChange = jest.fn();
  });

  test('Search input should be empty (empty string) by default', () => {
    render(<SearchPanel handleChange={handleChange} />);

    const searchInputElem = screen.getByTestId('search-input');
    expect(searchInputElem.value).toBe('');
  });

  test('Search input should contain string from props value', () => {
    render(
      <SearchPanel
        handleChange={handleChange}
        value="some_test_value"
      />,
    );

    const searchInputElem = screen.getByTestId('search-input');
    expect(searchInputElem.value).toBe('some_test_value');
  });

  test('should call the handleChange when text in input changes', () => {
    render(
      <SearchPanel
        handleChange={handleChange}
        value="some_test_value"
      />,
    );

    const searchInputElem = screen.getByTestId('search-input');
    fireEvent.change(searchInputElem, { target: { value: 'new_value_text' } });
    expect(handleChange).toBeCalled();
  });
});
