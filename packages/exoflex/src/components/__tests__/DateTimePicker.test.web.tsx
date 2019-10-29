import React, { useState } from 'react';
import { render, fireEvent, cleanup, act, wait } from '@testing-library/react';
import '../../../test/customFireEvent.web';
import Provider from '../Provider';
import Button from '../Button';
import DateTimePicker from '../DateTimePicker/DateTimePicker.web';

// NOTE: We need these to resolve `ReferenceError: regeneratorRuntime is not defined`
// https://stackoverflow.com/a/54490329
import 'core-js/stable';
import 'regenerator-runtime/runtime';

describe('DateTimePicker', () => {
  afterAll(() => {
    cleanup();
  });

  it('should render DatePicker properly', async () => {
    let date = '2019-10-18T00:00:00.000Z';
    let onConfirm = jest.fn((newDate: string) => {
      date = newDate;
    });
    let onCancel = jest.fn();
    let selectedDate = new Date(new Date(date).setDate(27));

    const App = () => {
      let [isVisible, setVisible] = useState(false);
      return (
        <Provider>
          <Button onPress={() => setVisible(true)}>Open</Button>
          <DateTimePicker
            isVisible={isVisible}
            mode="date"
            date={date}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </Provider>
      );
    };

    let { getByText } = render(<App />);
    act(() => {
      fireEvent.click(getByText('OPEN'));
    });
    await wait(() => getByText('27'));

    fireEvent.click(getByText('27'));
    fireEvent.click(getByText('CONFIRM'));
    expect(onConfirm).toHaveBeenCalled();
    expect(date).toBe(new Date(selectedDate).toISOString());
  });

  it('should render TimePicker properly', async () => {
    let date = '2019-10-18T00:10:00.000Z';
    let onConfirm = jest.fn((newDate: string) => {
      date = newDate;
    });
    let onCancel = jest.fn();
    let selectedDate = new Date(new Date(date).setMinutes(27));

    const App = () => {
      let [isVisible, setVisible] = useState(false);
      return (
        <Provider>
          <Button onPress={() => setVisible(true)}>Open</Button>
          <DateTimePicker
            isVisible={isVisible}
            mode="time"
            date={date}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </Provider>
      );
    };

    let { getByText, getByDisplayValue } = render(<App />);
    act(() => {
      fireEvent.click(getByText('OPEN'));
    });
    await wait(() => getByText('Hrs'));

    let minuteElement = getByDisplayValue('10');
    fireEvent.click(minuteElement);
    fireEvent.change(minuteElement, { target: { value: '27' } });
    fireEvent.blur(minuteElement);
    fireEvent.click(getByText('CONFIRM'));
    expect(onConfirm).toHaveBeenCalled();
    expect(date).toBe(new Date(selectedDate).toISOString());
  });

  it('should render DateTimePicker properly', async () => {
    let date = '2019-10-18T00:10:00.000Z';
    let onConfirm = jest.fn((newDate: string) => {
      date = newDate;
    });
    let onCancel = jest.fn();
    let selectedDate = new Date(
      new Date(new Date(date).setMinutes(27)).setDate(27),
    );

    const App = () => {
      let [isVisible, setVisible] = useState(false);
      return (
        <Provider>
          <Button onPress={() => setVisible(true)}>Open</Button>
          <DateTimePicker
            isVisible={isVisible}
            date={date}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </Provider>
      );
    };

    let { getByText, getByDisplayValue } = render(<App />);
    act(() => {
      fireEvent.click(getByText('OPEN'));
    });
    await wait(() => getByText('CONFIRM'));

    fireEvent.click(getByText('27'));
    fireEvent.click(getByText('CONFIRM'));
    await wait(() => getByText('Hrs'));

    let minuteElement = getByDisplayValue('10');
    fireEvent.click(minuteElement);
    fireEvent.change(minuteElement, { target: { value: '27' } });
    fireEvent.blur(minuteElement);
    fireEvent.click(getByText('CONFIRM'));
    expect(onConfirm).toHaveBeenCalled();
    expect(date).toBe(new Date(selectedDate).toISOString());
  });
});
