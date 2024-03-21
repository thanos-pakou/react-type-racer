import { render } from '@testing-library/react';
import App from '@/App'
import { expect, test } from 'vitest'

test('checks if the div contains "test"', () => {
    const { getByText } = render(<App />);
    const divWithTest = getByText('Test');
    expect(divWithTest).toBeInTheDocument();
  });
