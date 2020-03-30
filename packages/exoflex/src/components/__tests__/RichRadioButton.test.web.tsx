import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { render, fireEvent, act } from 'react-native-testing-library';

import '../../../test/customFireEvent.web';

import Provider from '../Provider';
import * as RichRadio from '../RichRadio';
import Text from '../Text';

const SIZES = [
  { label: 'S', value: 'small', testID: 'small' },
  { label: 'M', value: 'medium' },
  { label: 'L', value: 'large' },
];

describe('RichRadioButton', () => {
  it('should render properly', () => {
    const App = () => {
      let [size, setSize] = useState('');
      return (
        <Provider>
          <RichRadio.Group
            data={SIZES}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <RichRadio.Item
                label={item.label}
                selected={item.value === size}
                onPress={() => setSize(item.value)}
              />
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
  });

  it('should change selected value', () => {
    let newSize = '';

    const App = () => {
      let [size, setSize] = useState('');
      return (
        <Provider>
          <RichRadio.Group
            data={SIZES}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <RichRadio.Item
                label={item.label}
                selected={item.value === size}
                onPress={() => {
                  newSize = item.value;
                  setSize(newSize);
                }}
                testID={`item-${item.value}`}
              />
            )}
            style={{ marginBottom: 30 }}
          />
        </Provider>
      );
    };
    let { getByText, getByTestId } = render(<App />);

    expect(getByText('S')).toBeTruthy();
    expect(getByText('M')).toBeTruthy();
    expect(getByText('L')).toBeTruthy();
    expect(newSize).toBe('');

    act(() => fireEvent.press(getByText('M')));
    expect(newSize).toBe('medium');

    act(() => fireEvent.press(getByTestId('item-large')));
    expect(newSize).toBe('large');
  });

  it('should render custom item content properly', () => {
    let newSize = '';

    const App = () => {
      let [size, setSize] = useState('');
      return (
        <Provider>
          <RichRadio.Group
            data={SIZES}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  newSize = item.value;
                  setSize(newSize);
                }}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: item.value === size ? 'blue' : 'gray',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  weight="bold"
                  fontStyle="italic"
                  style={{ marginLeft: 10 }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
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
