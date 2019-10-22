import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TimePicker from '../TimePicker/TimePicker.web';

const date = '2019-10-10T11:03:21.044Z';

describe('TimePicker', () => {
  afterAll(() => {
    cleanup();
  });

  it('should render normally with format 12h', () => {
    let { getByDisplayValue, getByPlaceholderText } = render(
      <TimePicker date="" />,
    );
    expect(getByPlaceholderText('hh')).toBeTruthy();
    expect(getByPlaceholderText('mm')).toBeTruthy();
    expect(getByPlaceholderText('ss')).toBeTruthy();
    expect(getByDisplayValue('AM')).toBeTruthy();
  });

  it('should render normally with format 24h', () => {
    let { getByPlaceholderText, queryByDisplayValue } = render(
      <TimePicker date={date} format="24" />,
    );
    expect(getByPlaceholderText('hh')).toBeTruthy();
    expect(getByPlaceholderText('mm')).toBeTruthy();
    expect(getByPlaceholderText('ss')).toBeTruthy();
    expect(queryByDisplayValue('AM')).toBeFalsy();
  });

  it('should be able to change time and meridiem via textinput', () => {
    let mockOnChangeTime = jest.fn();
    let {
      getByPlaceholderText,
      getByDisplayValue,
      getAllByDisplayValue,
    } = render(<TimePicker date={date} onChangeTime={mockOnChangeTime} />);
    const meridiem = new Date(date).toLocaleTimeString('en-US').split(' ')[1];
    fireEvent.change(getByPlaceholderText('hh'), {
      target: { value: '10' },
    });
    fireEvent.change(getByPlaceholderText('mm'), {
      target: { value: '59' },
    });
    fireEvent.change(getByPlaceholderText('ss'), {
      target: { value: '59' },
    });
    fireEvent.change(getByDisplayValue(meridiem), {
      target: { value: 'pm' },
    });
    expect(getByDisplayValue('10')).toBeTruthy();
    expect(getAllByDisplayValue('59').length).toBe(2);
    expect(getByDisplayValue('pm')).toBeTruthy();
    expect(mockOnChangeTime).toHaveBeenCalled();
  });

  it('should check the value on blur', () => {
    let {
      getByDisplayValue,
      getAllByDisplayValue,
      getByPlaceholderText,
    } = render(<TimePicker date={date} />);
    const meridiem = new Date(date).toLocaleTimeString('en-US').split(' ')[1];
    fireEvent.change(getByPlaceholderText('hh'), {
      target: { value: '36' },
    });
    fireEvent.blur(getByPlaceholderText('hh'));
    fireEvent.change(getByPlaceholderText('mm'), { target: { value: '99' } });
    fireEvent.blur(getByPlaceholderText('mm'));
    fireEvent.change(getByPlaceholderText('ss'), { target: { value: '99' } });
    fireEvent.blur(getByPlaceholderText('ss'));
    fireEvent.change(getByDisplayValue(meridiem), {
      target: { value: 'ok' },
    });
    fireEvent.blur(getByDisplayValue('ok'));
    expect(getByDisplayValue('12')).toBeTruthy();
    expect(getAllByDisplayValue('00').length).toBe(2);
    expect(getByDisplayValue('AM')).toBeTruthy();
  });
});
