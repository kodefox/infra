import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '../../../test/customFireEvent.web';
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
    fireEvent.click(getByText('bar'));
    expect(onPressMock).toBeCalledTimes(1);

    fireEvent.click(getByTestId('checkbox'));
    expect(onPressMock).toBeCalledTimes(2);
  });
});
