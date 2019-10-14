import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('should render the checkbox label properly', () => {
    let { getByText } = render(<Checkbox label="foo" />);
    expect(getByText('foo')).toBeTruthy();
  });

  it('should handle callback properly', () => {
    const onPressMock = jest.fn();
    let { getByText } = render(<Checkbox label="bar" onPress={onPressMock} />);
    fireEvent.press(getByText('bar'));
    expect(onPressMock).toBeCalledTimes(1);
  });
});
