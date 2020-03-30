import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Provider from '../Provider';
import '../../../test/customFireEvent.web';
import DrawerItem from '../Drawer/DrawerItem';

const emptyFn = () => {};

describe('DrawerItem', () => {
  it('should render normally', () => {
    let { getByText, getByTestId } = render(
      <Provider>
        <DrawerItem testID="item" label="First menu" onPress={emptyFn} />
      </Provider>,
    );
    expect(getByText('First menu')).toBeTruthy();
    expect(getByTestId('item')).toBeTruthy();
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
    let { getByText, getByTestId } = render(
      <Provider>
        <DrawerItem
          testID="item"
          label="First menu"
          icon="home"
          onPress={mockPress}
        />
      </Provider>,
    );
    fireEvent.click(getByText('First menu'));
    expect(mockPress).toBeCalledTimes(1);

    fireEvent.click(getByTestId('item'));
    expect(mockPress).toBeCalledTimes(2);
  });
});
