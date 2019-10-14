import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

const warningSpy = jest
  .spyOn(console, 'warn')
  .mockImplementation((message: string) => {
    let blacklistedMessage =
      'Warning: componentWillReceiveProps has been renamed';
    return message.startsWith(blacklistedMessage) ? '' : message;
  });

describe('Checkbox', () => {
  afterAll(() => {
    warningSpy.mockClear();
  });

  it('should render the checkbox label properly', () => {
    let { getByText } = render(<Checkbox label="foo" />);
    expect(getByText('foo')).toBeTruthy();
  });

  it('should handle callback properly', () => {
    const onPressMock = jest.fn();
    let { getByText } = render(<Checkbox label="bar" onPress={onPressMock} />);
    let element = getByText('bar');
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    expect(onPressMock).toBeCalledTimes(1);
  });
});
