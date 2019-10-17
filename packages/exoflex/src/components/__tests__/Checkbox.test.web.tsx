import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '../../../test/customFireEvent.web';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('should render the checkbox label properly', () => {
    let { getByText } = render(<Checkbox label="foo" />);
    expect(getByText('foo')).toBeTruthy();
  });

  it('should handle callback properly', () => {
    const onPressMock = jest.fn();
    let { getByText } = render(<Checkbox label="bar" onPress={onPressMock} />);
    fireEvent.click(getByText('bar'));
    expect(onPressMock).toBeCalledTimes(1);
  });
});
