import React, { useState } from 'react';
import Provider from '../Provider';
import { render, fireEvent, act } from 'react-native-testing-library';
import '../../../test/customFireEvent.web';
import RichRadioButton from '../RichRadioButton';
import Text from '../Text';

const SIZES = [
  { label: 'S', value: 'small' },
  { label: 'M', value: 'medium' },
  { label: 'L', value: 'large' },
];

describe('RichRadioButton', () => {
  it('should render properly', () => {
    const App = () => {
      let [size, setSize] = useState('');
      return (
        <Provider>
          <RichRadioButton
            data={SIZES}
            selectedValue={size}
            onValueChanged={setSize}
            style={{ marginBottom: 30 }}
          />
        </Provider>
      );
    };
    let { getByText } = render(<App />);

    expect(getByText('S')).toBeTruthy();
    expect(getByText('M')).toBeTruthy();
    expect(getByText('L')).toBeTruthy();
  });

  it('should change selected value', () => {
    let newSize = '';

    const App = () => {
      let [size, setSize] = useState('');
      return (
        <Provider>
          <RichRadioButton
            data={SIZES}
            selectedValue={size}
            onValueChanged={(value) => {
              newSize = value;
              setSize(value);
            }}
            style={{ marginBottom: 30 }}
          />
        </Provider>
      );
    };
    let { getByText } = render(<App />);

    expect(getByText('S')).toBeTruthy();
    expect(getByText('M')).toBeTruthy();
    expect(getByText('L')).toBeTruthy();
    expect(newSize).toBe('');

    act(() => fireEvent.press(getByText('M')));

    expect(newSize).toBe('medium');
  });

  it('should render custom item content properly', () => {
    let newSize = '';

    const App = () => {
      let [size, setSize] = useState('');
      return (
        <Provider>
          <RichRadioButton
            data={SIZES}
            selectedValue={size}
            onValueChanged={(value) => {
              newSize = value;
              setSize(value);
            }}
            renderCustomItemContent={(label) => (
              <Text fontStyle="italic" weight="bold" style={{ marginLeft: 10 }}>
                {label}
              </Text>
            )}
            style={{ marginBottom: 30 }}
          />
        </Provider>
      );
    };
    let { getByText } = render(<App />);

    expect(getByText('S')).toBeTruthy();
    expect(getByText('M')).toBeTruthy();
    expect(getByText('L')).toBeTruthy();
    expect(newSize).toBe('');

    act(() => fireEvent.press(getByText('M')));

    expect(newSize).toBe('medium');
  });
});
