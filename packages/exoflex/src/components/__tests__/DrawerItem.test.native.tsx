import React from 'react';
import Provider from '../Provider';
import { render, fireEvent } from 'react-native-testing-library';
import DrawerItem from '../Drawer/DrawerItem';

const emptyFn = () => {};

describe('DrawerItem', () => {
  it('should render normally', () => {
    let { getByText } = render(
      <Provider>
        <DrawerItem label="First menu" onPress={emptyFn} />
      </Provider>,
    );
    expect(getByText('First menu')).toBeTruthy();
  });

  it('should render normally with icon', () => {
    let { getByText } = render(
      <Provider>
        <DrawerItem active label="First menu" icon="home" onPress={emptyFn} />
      </Provider>,
    );
    expect(getByText('First menu')).toBeTruthy();
  });

  it('should run onPress', () => {
    let mockPress = jest.fn();
    let { getByText } = render(
      <Provider>
        <DrawerItem label="First menu" icon="home" onPress={mockPress} />
      </Provider>,
    );
    fireEvent.press(getByText('First menu'));
    expect(mockPress).toBeCalledTimes(1);
  });
});
