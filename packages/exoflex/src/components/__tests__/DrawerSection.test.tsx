import React from 'react';
import { Provider } from 'react-native-paper';
import { render as renderWeb } from '@testing-library/react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import DrawerSection from '../Drawer/DrawerSection';
import DrawerItem from '../Drawer/DrawerItem';

type Platforms = 'web' | 'ios' | 'android';

const emptyFn = () => {};

const DefaultSection = () => (
  <Provider>
    <DrawerSection headerSource={{ uri: 'https://picsum.photos/300' }}>
      <DrawerItem label="First menu" onPress={emptyFn} />
    </DrawerSection>
  </Provider>
);

const CircleHeaderSection = () => (
  <Provider>
    <DrawerSection
      headerMode="circle"
      headerSource={{ uri: 'https://picsum.photos/300' }}
    >
      <DrawerItem label="First menu" onPress={emptyFn} />
    </DrawerSection>
  </Provider>
);

const DefaultSectionWithFooter = () => (
  <Provider>
    <DrawerSection
      headerSource={{ uri: 'https://picsum.photos/300' }}
      footerLabel="Sign out"
      footerOnPress={emptyFn}
    >
      <DrawerItem label="First menu" onPress={emptyFn} />
    </DrawerSection>
  </Provider>
);

describe('DrawerSection', () => {
  cases(
    'should render normally with full image header',
    (option) => {
      let platform = option.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText, getByTestId } =
          platform === 'web'
            ? renderWeb(<DefaultSection />)
            : render(<DefaultSection />);
        expect(getByText('First menu')).toBeTruthy();
        expect(getByTestId('drawerHeaderFullImage')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should render normally with circle image header',
    (option) => {
      let platform = option.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText, getByTestId } =
          platform === 'web'
            ? renderWeb(<CircleHeaderSection />)
            : render(<CircleHeaderSection />);
        expect(getByText('First menu')).toBeTruthy();
        expect(getByTestId('drawerHeaderCircleImage')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should render normally with footer menu',
    (option) => {
      let platform = option.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText, getByTestId } =
          platform === 'web'
            ? renderWeb(<DefaultSectionWithFooter />)
            : render(<DefaultSectionWithFooter />);
        expect(getByText('First menu')).toBeTruthy();
        expect(getByText('Sign out')).toBeTruthy();
        expect(getByTestId('drawerHeaderFullImage')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );
});
