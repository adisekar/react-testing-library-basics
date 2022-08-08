import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App />);

  // find element with role of button and text of 'Change to blue'
  const buttonElement = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('button turns blue when clicked', () => {
  render(<App />);

  // find element with role of button and text of 'Change to blue'
  const buttonElement = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  // click button
  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  expect(buttonElement).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  // Check button is enabled and checkbox is unchecked
  render(<App />);

  // find element with role of button and text of 'Change to blue'
  const buttonElement = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(buttonElement).toBeEnabled();
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox');

  // first click
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  // second click
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();

});

test('button disabled when checkbox is checked, and enabled when checkbox unchecked', () => {
  render(<App />);

  // find element with role of button and text of 'Change to blue'
  const buttonElement = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  // click checkbox first time - checked
  fireEvent.click(checkbox);
  expect(buttonElement).toBeDisabled();

  // click checkbox - unchecked
  fireEvent.click(checkbox);
  expect(buttonElement).toBeEnabled();
});

test('button gray when disabled', () => {
  render(<App />);

  // find element with role of button and text of 'Change to blue'
  const buttonElement = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // click checkbox first time - checked
  fireEvent.click(checkbox);
  expect(buttonElement).toHaveStyle({ backgroundColor: 'gray' });

  // click checkbox again- unchecked
  fireEvent.click(checkbox);
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  // click button to change color, and click checkbox to disable button
  fireEvent.click(buttonElement);
  fireEvent.click(checkbox);
  expect(buttonElement).toHaveStyle({ backgroundColor: 'gray' });

  // click button to change color, and click checkbox to enable button
  fireEvent.click(checkbox);
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});


