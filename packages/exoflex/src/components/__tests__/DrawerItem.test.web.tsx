import React from 'react';
import Provider from '../Provider';
import { render, fireEvent } from '@testing-library/react';
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
    let element = getByText('First menu');
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    expect(mockPress).toBeCalledTimes(1);
  });
});
