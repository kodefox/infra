import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Provider from '../Provider';
import DrawerSection from '../Drawer/DrawerSection';
import DrawerItem from '../Drawer/DrawerItem';

const emptyFn = () => {};

describe('DrawerSection', () => {
  it('should render normally with full image header', () => {
    let { getByText, getByTestId } = render(
      <Provider>
        <DrawerSection headerSource={{ uri: 'https://picsum.photos/300' }}>
          <DrawerItem label="First menu" onPress={emptyFn} />
        </DrawerSection>
      </Provider>,
    );
    expect(getByText('First menu')).toBeTruthy();
    expect(getByTestId('drawerHeaderFullImage')).toBeTruthy();
  });

  it('should render normally with circle image header', () => {
    let { getByText, getByTestId } = render(
      <Provider>
        <DrawerSection
          headerMode="circle"
          headerSource={{ uri: 'https://picsum.photos/300' }}
        >
          <DrawerItem label="First menu" onPress={emptyFn} />
        </DrawerSection>
      </Provider>,
    );
    expect(getByText('First menu')).toBeTruthy();
    expect(getByTestId('drawerHeaderCircleImage')).toBeTruthy();
  });

  it('should render normally with footer menu', () => {
    let { getByText, getByTestId } = render(
      <Provider>
        <DrawerSection
          headerSource={{ uri: 'https://picsum.photos/300' }}
          footerLabel="Sign out"
        >
          <DrawerItem active label="First menu" onPress={emptyFn} />
        </DrawerSection>
      </Provider>,
    );
    let footerElement = getByText('Sign out');
    expect(getByText('First menu')).toBeTruthy();
    expect(footerElement).toBeTruthy();
    expect(getByTestId('drawerHeaderFullImage')).toBeTruthy();
    fireEvent.press(footerElement);
  });

  it('should render normally with footer menu and provided footerOnPress', () => {
    let mockPress = jest.fn();
    let { getByText, getByTestId } = render(
      <Provider>
        <DrawerSection
          headerSource={{ uri: 'https://picsum.photos/300' }}
          footerLabel="Sign out"
          footerOnPress={mockPress}
        >
          <DrawerItem active label="First menu" onPress={emptyFn} />
        </DrawerSection>
      </Provider>,
    );
    let footerElement = getByText('Sign out');
    expect(getByText('First menu')).toBeTruthy();
    expect(footerElement).toBeTruthy();
    expect(getByTestId('drawerHeaderFullImage')).toBeTruthy();
    fireEvent.press(footerElement);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
