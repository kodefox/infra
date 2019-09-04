import React from 'react';
import { Provider } from 'react-native-paper';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
} from '@testing-library/react';
import { render, fireEvent } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import Button from '../Button';

const BasicButton = () => (
  <Provider>
    <Button preset="primary">This is primary button</Button>
  </Provider>
);

const BasicButtonWithIcon = () => (
  <Provider>
    <Button preset="primary" icon="home">
      This is primary button with icon
    </Button>
  </Provider>
);

const ClickableButton = (props: { onPress: jest.Mock<any, any> }) => (
  <Provider>
    <Button preset="primary" onPress={props.onPress}>
      Press me!
    </Button>
  </Provider>
);

const DisabledButton = (props: { onPress: jest.Mock<any, any> }) => (
  <Provider>
    <Button disabled preset="primary" onPress={props.onPress}>
      Press me!
    </Button>
  </Provider>
);

type Platforms = 'web' | 'ios' | 'android';

describe('Button', () => {
  cases(
    'should render normally',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web'
            ? renderWeb(<BasicButton />)
            : render(<BasicButton />);
        expect(getByText('THIS IS PRIMARY BUTTON')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should render normally with icon',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web'
            ? renderWeb(<BasicButtonWithIcon />)
            : render(<BasicButtonWithIcon />);
        expect(getByText('THIS IS PRIMARY BUTTON WITH ICON')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should run onPress',
    (opts) => {
      let platform = opts.platform as Platforms;
      let mockedOnPress = jest.fn();
      if (platform === 'web') {
        let { getByText } = renderWeb(
          <ClickableButton onPress={mockedOnPress} />,
        );
        let element = getByText('PRESS ME!');
        fireEventWeb.mouseDown(element);
        fireEventWeb.mouseUp(element);
      } else {
        let { getByText } = render(<ClickableButton onPress={mockedOnPress} />);
        fireEvent.press(getByText('PRESS ME!'));
      }
      expect(mockedOnPress).toBeCalledTimes(1);
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should render disabled',
    (opts) => {
      let platform = opts.platform as Platforms;
      let mockedOnPress = jest.fn();
      if (platform === 'web') {
        let { getByText } = renderWeb(
          <DisabledButton onPress={mockedOnPress} />,
        );
        let element = getByText('PRESS ME!');
        fireEventWeb.mouseDown(element);
        fireEventWeb.mouseUp(element);
        expect(element).toBeTruthy();
      } else {
        let { getByText } = render(<DisabledButton onPress={mockedOnPress} />);
        let element = getByText('PRESS ME!');
        // NOTE: Disable this as this is still an issue (https://github.com/callstack/react-native-testing-library/issues/28)
        // fireEvent.press(element);
        expect(element).toBeTruthy();
      }
      expect(mockedOnPress).toBeCalledTimes(0);
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );
});
