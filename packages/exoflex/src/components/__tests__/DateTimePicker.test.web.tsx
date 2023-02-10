import React, { useState } from 'react';
import {
  render,
  fireEvent,
  cleanup,
  act,
  waitFor,
} from '@testing-library/react';
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
    let selectedDate = new Date(new Date(date).setDate(9));

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
      fireEvent(
        getByText('Open'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(() => getByText('CONFIRM'));

    fireEvent(
      getByText('9'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByText('CONFIRM'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
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

    let { getByText, getByDisplayValue, getByPlaceholderText } = render(
      <App />,
    );
    act(() => {
      fireEvent(
        getByText('Open'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(() => getByPlaceholderText('hh'));

    let minuteElement = getByDisplayValue('10');
    fireEvent(
      minuteElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent.change(minuteElement, { target: { value: '27' } });
    fireEvent.blur(minuteElement);
    fireEvent(
      getByText('CONFIRM'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
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
      new Date(new Date(date).setMinutes(27)).setDate(9),
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

    let { getByText, getByDisplayValue, getByPlaceholderText } = render(
      <App />,
    );
    act(() => {
      fireEvent(
        getByText('Open'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(() => getByText('CONFIRM'));

    fireEvent(
      getByText('9'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByText('CONFIRM'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    await waitFor(() => getByPlaceholderText('hh'));

    let minuteElement = getByDisplayValue('10');
    fireEvent(
      minuteElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent.change(minuteElement, { target: { value: '27' } });
    fireEvent.blur(minuteElement);
    fireEvent(
      getByText('CONFIRM'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onConfirm).toHaveBeenCalled();
    expect(date).toBe(new Date(selectedDate).toISOString());
  });
});
