import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('should render the checkbox label properly', () => {
    let { getByText, getByTestId } = render(
      <Checkbox testID="checkbox" label="foo" />,
    );
    expect(getByText('foo')).toBeTruthy();
    expect(getByTestId('checkbox')).toBeTruthy();
  });

  it('should handle callback properly', () => {
    const onPressMock = jest.fn();
    let { getByText, getByTestId } = render(
      <Checkbox testID="checkbox" label="bar" onPress={onPressMock} />,
    );
    fireEvent.press(getByText('bar'));
    expect(onPressMock).toBeCalledTimes(1);

    fireEvent.press(getByTestId('checkbox'));
    expect(onPressMock).toBeCalledTimes(2);
  });
});
