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
    fireEvent(
      getByText('bar'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onPressMock).toBeCalledTimes(1);

    fireEvent(
      getByTestId('checkbox'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onPressMock).toBeCalledTimes(2);
  });
});
