import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
} from '@testing-library/react';

import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should render the label properly', () => {
    let App = () => <TextInput label="Label" value="Cool" />;

    let { getByText } = render(<App />);
    expect(getByText('Label')).toBeTruthy();

    withPlatform('web', () => {
      let { getByText } = renderWeb(<App />);
      expect(getByText('Label')).toBeTruthy();
    });
  });

  it('should execute callback properly', () => {
    let onChangeMock = jest.fn();
    let App = () => (
      <TextInput label="Label" value="Cool" onChangeText={onChangeMock} />
    );

    let { getByDisplayValue } = render(<App />);
    fireEvent(getByDisplayValue('Cool'), 'onChangeText', 'foo');
    expect(onChangeMock).toHaveBeenCalledWith('foo');

    withPlatform('web', () => {
      let onChangeMock = jest.fn();
      let App = () => (
        <TextInput label="Label" value="Cool" onChangeText={onChangeMock} />
      );

      let { getByDisplayValue } = renderWeb(<App />);
      fireEventWeb.change(getByDisplayValue('Cool'), {
        target: { value: 'bar' },
      });

      expect(onChangeMock).toHaveBeenCalledWith('bar');
    });
  });
});
