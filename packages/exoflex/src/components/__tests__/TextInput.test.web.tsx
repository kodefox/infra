import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should render the label properly', () => {
    let App = () => (
      <>
        <TextInput
          testID="outlinedInput"
          label="Label for Outlined"
          value="Cool"
        />
        <TextInput
          label="Label for Outlined (Disabled)"
          value="Cool"
          disabled
        />
        <TextInput
          testID="flatInput"
          mode="flat"
          label="Label for Flat"
          value="Cool"
        />
      </>
    );

    let { getByText, getByTestId } = render(<App />);
    expect(getByText('Label for Outlined')).toBeTruthy();
    expect(getByText('Label for Outlined (Disabled)')).toBeTruthy();
    expect(getByText('Label for Flat')).toBeTruthy();
    expect(getByTestId('outlinedInput')).toBeTruthy();
    expect(getByTestId('flatInput')).toBeTruthy();
  });

  it('should render the error message', () => {
    let App = () => (
      <>
        <TextInput
          label="Label for Outlined"
          value="Cool"
          errorMessage="Something outlined happened"
        />
        <TextInput
          mode="flat"
          label="Label for Flat"
          value="Cool"
          errorMessage="Something flat happened"
        />
      </>
    );

    let { getByText } = render(<App />);
    expect(getByText('Something outlined happened')).toBeTruthy();
    expect(getByText('Something flat happened')).toBeTruthy();
  });

  it('should not render the label', () => {
    let App = () => (
      <>
        <TextInput value="Cool Outlined" />
        <TextInput mode="flat" value="Cool Flat" />
      </>
    );

    let { getByDisplayValue } = render(<App />);
    expect(getByDisplayValue('Cool Outlined')).toBeTruthy();
    expect(getByDisplayValue('Cool Flat')).toBeTruthy();
  });

  it('should render with uppercase value', () => {
    let App = () => (
      <>
        <TextInput value="Cool Outlined" uppercase />
        <TextInput mode="flat" value="Cool Flat" uppercase />
      </>
    );

    let { getByDisplayValue } = render(<App />);
    expect(getByDisplayValue('COOL OUTLINED')).toBeTruthy();
    expect(getByDisplayValue('COOL FLAT')).toBeTruthy();
  });

  it('should execute callback properly', () => {
    let onChangeOutlinedMock = jest.fn();
    let onChangeFlatMock = jest.fn();
    let App = () => (
      <>
        <TextInput
          testID="outlinedInput"
          label="Label"
          value="Cool Outlined"
          onChangeText={onChangeOutlinedMock}
        />
        <TextInput
          testID="flatInput"
          mode="flat"
          label="Label"
          value="Cool Flat"
          onChangeText={onChangeFlatMock}
        />
      </>
    );

    let { getByDisplayValue, getByTestId } = render(<App />);
    fireEvent.change(getByDisplayValue('Cool Outlined'), {
      target: { value: 'bar' },
    });
    fireEvent.change(getByDisplayValue('Cool Flat'), {
      target: { value: 'foo' },
    });

    expect(onChangeOutlinedMock).toHaveBeenCalledWith('bar');
    expect(onChangeFlatMock).toHaveBeenCalledWith('foo');

    fireEvent.change(getByTestId('outlinedInput'), {
      target: { value: 'bar bar' },
    });
    fireEvent.change(getByTestId('flatInput'), {
      target: { value: 'foo foo' },
    });

    expect(onChangeOutlinedMock).toHaveBeenCalledWith('bar bar');
    expect(onChangeFlatMock).toHaveBeenCalledWith('foo foo');
  });

  it('should handle focus and blur properly', () => {
    let onFocusMock = jest.fn();
    let onBlurMock = jest.fn();
    let App = () => (
      <>
        <TextInput value="Cool" onFocus={onFocusMock} onBlur={onBlurMock} />
        <TextInput
          mode="flat"
          value="Cool Flat"
          onFocus={onFocusMock}
          onBlur={onBlurMock}
        />
      </>
    );

    let { getByDisplayValue } = render(<App />);
    fireEvent.focus(getByDisplayValue('Cool'));
    fireEvent.blur(getByDisplayValue('Cool'));
    fireEvent.focus(getByDisplayValue('Cool Flat'));
    fireEvent.blur(getByDisplayValue('Cool Flat'));

    expect(onFocusMock).toHaveBeenCalledTimes(2);
    expect(onBlurMock).toHaveBeenCalledTimes(2);
  });
});
