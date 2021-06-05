import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from 'components/App';

test('renders learn react link', () => {
  render(<App />);
  const mainElement = screen.getByText(/initial commit/i);
  expect(mainElement).toBeInTheDocument();
});
