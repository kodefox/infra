import React from 'react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import { render as renderWeb } from '@testing-library/react';

import Provider from '../Provider';
import Text from '../Text';

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

  /**
   * BUG: This web test case must be executed first before the native one.
   *
   * The error thrown when `renderWeb` is called.
   * Error thrown: Error: Uncaught [TypeError: Array.prototype.slice called on null or undefined]
   */
  it('should render text when wrapped with provider on the web', () => {
    let App = () => (
      <Provider skipFontsLoading>
        <Text>Foobar 3000</Text>
      </Provider>
    );

    withPlatform('web', () => {
      let { getByText } = renderWeb(<App />);
      expect(getByText('Foobar 3000')).toBeTruthy();
    });
  });

  it('should render text when wrapped with provider', () => {
    let App = () => (
      <Provider skipFontsLoading>
        <Text>Foobar 3000</Text>
      </Provider>
    );

    let { getByText } = render(<App />);
    expect(getByText('Foobar 3000')).toBeTruthy();
  });
});
