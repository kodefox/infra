import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should render the label properly', () => {
    let App = () => <TextInput label="Label" value="Cool" />;

    let { getByText } = render(<App />);
    expect(getByText('Label')).toBeTruthy();
  });

  it('should execute callback properly', () => {
    let onChangeMock = jest.fn();
    let App = () => (
      <TextInput label="Label" value="Cool" onChangeText={onChangeMock} />
    );

    let { getByDisplayValue } = render(<App />);
    fireEvent(getByDisplayValue('Cool'), 'onChangeText', 'foo');
    expect(onChangeMock).toHaveBeenCalledWith('foo');
  });
});
