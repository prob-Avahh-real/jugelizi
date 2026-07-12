import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

// Basic smoke test to verify the test suite works
describe('App smoke test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Text>Hello World</Text>);
    expect(getByText('Hello World')).toBeTruthy();
  });
});
