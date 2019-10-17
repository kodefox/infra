import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TimePicker from '../TimePicker/TimePicker.web';
import { padTime } from '../../helpers/displayTime';

const date = '2019-10-10T11:03:11.044Z';

describe('TimePicker', () => {
  afterAll(() => {
    cleanup();
  });

  it('should render normally with format 12h', () => {
    let { getByDisplayValue, getAllByDisplayValue } = render(
      <TimePicker date="" />,
    );
    expect(getByDisplayValue('12')).toBeTruthy();
    expect(getAllByDisplayValue('00').length).toBe(2);
    expect(getByDisplayValue('AM')).toBeTruthy();
  });

  it('should render normally with format 24h', () => {
    let { getByDisplayValue, queryByDisplayValue } = render(
      <TimePicker date={date} format="24" />,
    );
    let d = new Date(date);
    expect(getByDisplayValue(padTime(d.getHours()))).toBeTruthy();
    expect(getByDisplayValue('03')).toBeTruthy();
    expect(getByDisplayValue('11')).toBeTruthy();
    expect(queryByDisplayValue('AM')).toBeFalsy();
  });

  it('should be able to change time and meridiem via textinput', () => {
    let mockOnChangeTime = jest.fn();
    let { getByDisplayValue, getAllByDisplayValue } = render(
      <TimePicker date={date} onChangeTime={mockOnChangeTime} />,
    );
    const [time, meridiem] = new Date(date)
      .toLocaleTimeString('en-US')
      .split(' ');
    const [h, m, s] = time.split(':');
    fireEvent.change(getByDisplayValue(padTime(h)), {
      target: { value: '10' },
    });
    fireEvent.change(getByDisplayValue(m), {
      target: { value: '59' },
    });
    fireEvent.change(getByDisplayValue(s), {
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
    let { getByDisplayValue, getAllByDisplayValue } = render(
      <TimePicker date={date} />,
    );
    const [time, meridiem] = new Date(date)
      .toLocaleTimeString('en-US')
      .split(' ');
    const [h, m, s] = time.split(':');
    fireEvent.change(getByDisplayValue(padTime(h)), {
      target: { value: '36' },
    });
    fireEvent.blur(getByDisplayValue('36'));
    fireEvent.change(getByDisplayValue(m), { target: { value: '99' } });
    fireEvent.blur(getByDisplayValue('99'));
    fireEvent.change(getByDisplayValue(s), { target: { value: '99' } });
    fireEvent.blur(getByDisplayValue('99'));
    fireEvent.change(getByDisplayValue(meridiem), {
      target: { value: 'ok' },
    });
    fireEvent.blur(getByDisplayValue('ok'));
    expect(getByDisplayValue('12')).toBeTruthy();
    expect(getAllByDisplayValue('00').length).toBe(2);
    expect(getByDisplayValue('AM')).toBeTruthy();
  });
});
