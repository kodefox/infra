import React from 'react';
import { Provider } from 'react-native-paper';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
} from '@testing-library/react';
import { render, fireEvent } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import DrawerItem from '../Drawer/DrawerItem';

type Platforms = 'web' | 'ios' | 'android';

const emptyFn = () => {};

const BasicItem = () => (
  <Provider>
    <DrawerItem label="First menu" onPress={emptyFn} />
  </Provider>
);

const BasicItemWithIcon = () => (
  <Provider>
    <DrawerItem label="First menu" icon="home" onPress={emptyFn} />
  </Provider>
);

const ClickableBasicItem = (props: {
  onPress: jest.Mock<unknown, Array<unknown>>;
}) => (
  <Provider>
    <DrawerItem label="First menu" icon="home" onPress={props.onPress} />
  </Provider>
);

describe('DrawerItem', () => {
  cases(
    'should render normally',
    (option) => {
      let platform = option.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web' ? renderWeb(<BasicItem />) : render(<BasicItem />);
        expect(getByText('First menu')).toBeTruthy();
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
    (option) => {
      let platform = option.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web'
            ? renderWeb(<BasicItemWithIcon />)
            : render(<BasicItemWithIcon />);
        expect(getByText('First menu')).toBeTruthy();
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
    (option) => {
      let platform = option.platform as Platforms;
      let onPress = jest.fn();
      withPlatform(platform, () => {
        if (platform === 'web') {
          let { getByText } = renderWeb(
            <ClickableBasicItem onPress={onPress} />,
          );
          let element = getByText('First menu');
          fireEventWeb.mouseDown(element);
          fireEventWeb.mouseUp(element);
        } else {
          let { getByText } = render(<ClickableBasicItem onPress={onPress} />);
          fireEvent.press(getByText('First menu'));
        }
        expect(onPress).toBeCalledTimes(1);
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );
});
