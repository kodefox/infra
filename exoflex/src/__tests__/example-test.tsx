import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import { render as renderWeb } from '@testing-library/react';

describe('test', () => {
  it('should return true', () => {
    expect(true).toBe(true);
  });

  it('should render text', () => {
    let App = () => (
      <>
        <Text>Test component</Text>
      </>
    );
    let { getByText } = render(<App />);
    expect(getByText('Test component')).toBeTruthy();
  });

  it('should render text on web', () => {
    let App = () => (
      <>
        <Text>Test component</Text>
      </>
    );
    withPlatform('web', () => {
      let { getByText } = renderWeb(<App />);
      expect(getByText('Test component')).toBeTruthy();
    });
  });
});
