import React from 'react';
import { render } from '@testing-library/react';

import Provider from '../Provider';
import Text from '../Text';

const warningSpy = jest
  .spyOn(console, 'warn')
  .mockImplementation((message: string) => {
    let blacklistedMessage =
      'Warning: componentWillReceiveProps has been renamed';
    return message.startsWith(blacklistedMessage) ? '' : message;
  });

describe('Text', () => {
  afterAll(() => {
    warningSpy.mockClear();
  });

  it('should render text when not wrapped with provider', () => {
    let App = () => (
      <>
        <Text>Foobar 3000</Text>
      </>
    );
    let { getByText } = render(<App />);
    expect(getByText('Foobar 3000')).toBeTruthy();
  });

  it('should render text when wrapped with provider on the web', () => {
    let App = () => (
      <Provider skipFontsLoading>
        <Text>Foobar 3000</Text>
      </Provider>
    );

    let { getByText } = render(<App />);
    expect(getByText('Foobar 3000')).toBeTruthy();
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
