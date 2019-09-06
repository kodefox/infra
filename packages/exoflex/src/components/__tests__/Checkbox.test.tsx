import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
} from '@testing-library/react';
import cases from 'jest-in-case';
import Checkbox from '../Checkbox';

type Platforms = 'web' | 'ios' | 'android';

describe('Checkbox', () => {
  cases(
    'should render the checkbox label properly',
    (opts) => {
      let App = () => <Checkbox label="foo" />;

      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web' ? renderWeb(<App />) : render(<App />);
        expect(getByText('foo')).toBeTruthy();
      });
    },
    [{ platform: 'web' }, { platform: 'ios' }, { platform: 'android' }],
  );

  cases(
    'should handle callback properly',
    (opts) => {
      let onPressMock = jest.fn();
      let App = () => <Checkbox label="bar" onPress={onPressMock} />;
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        if (platform === 'web') {
          let { getByText } = renderWeb(<App />);
          fireEventWeb.mouseDown(getByText('bar'));
          fireEventWeb.mouseUp(getByText('bar'));
        } else {
          let { getByText } = render(<App />);
          fireEvent.press(getByText('bar'));
        }
        expect(onPressMock).toBeCalledTimes(1);
      });
    },
    [{ platform: 'web' }, { platform: 'ios' }, { platform: 'android' }],
  );
});
