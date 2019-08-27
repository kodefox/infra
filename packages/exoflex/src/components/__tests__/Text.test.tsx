import React from 'react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import { render as renderWeb } from '@testing-library/react';

import Provider from '../Provider';
import Text from '../Text';
import { DefaultTheme } from '../../constants/themes';

describe('Text', () => {
  it('should render text when not wrapped with provider', () => {
    let App = () => (
      <>
        <Text>Foobar 3000</Text>
      </>
    );
    let { getByText } = render(<App />);
    expect(getByText('Foobar 3000')).toBeTruthy();

    withPlatform('web', () => {
      let { getByText } = renderWeb(<App />);
      expect(getByText('Foobar 3000')).toBeTruthy();
    });
  });

  it('should render text when wrapped with provider', () => {
    let App = () => (
      <Provider theme={DefaultTheme}>
        <Text>Foobar 3000</Text>
      </Provider>
    );
    let { getByText } = render(<App />);
    expect(getByText('Foobar 3000')).toBeTruthy();

    withPlatform('web', () => {
      let { getByText } = renderWeb(<App />);
      expect(getByText('Foobar 3000')).toBeTruthy();
    });
  });
});
