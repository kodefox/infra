import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TimePicker from '../TimePicker/TimePicker.web';

const date = '2019-10-10T11:03:11.044Z';

describe('TimePicker', () => {
  afterAll(() => {
    cleanup();
  });

  it('should render normally with format 12h', () => {
    let { getByDisplayValue, getAllByDisplayValue } = render(
      <TimePicker date={date} />,
    );
    expect(getByDisplayValue('12')).toBeTruthy();
    expect(getAllByDisplayValue('00').length).toBe(2);
    expect(getByDisplayValue('AM')).toBeTruthy();
  });

  it('should render normally with format 24h', () => {
    let {
      getByDisplayValue,
      getAllByDisplayValue,
      queryByDisplayValue,
    } = render(<TimePicker date={date} format="24" />);
    expect(getByDisplayValue('12')).toBeTruthy();
    expect(getAllByDisplayValue('00').length).toBe(2);
    expect(queryByDisplayValue('AM')).toBeFalsy();
  });

  it('should be able to change time and meridiem via textinput', () => {
    let mockOnChangeTime = jest.fn();
    let { getByDisplayValue, getAllByDisplayValue } = render(
      <TimePicker date={date} onChangeTime={mockOnChangeTime} />,
    );
    fireEvent.change(getByDisplayValue('12'), {
      target: { value: '10' },
    });
    let minsSecs = getAllByDisplayValue('00');
    minsSecs.forEach((element) => {
      fireEvent.change(element, { target: { value: '59' } });
    });
    fireEvent.change(getByDisplayValue('AM'), {
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
    fireEvent.change(getByDisplayValue('12'), {
      target: { value: '36' },
    });
    fireEvent.blur(getByDisplayValue('36'));
    let minsSecs = getAllByDisplayValue('00');
    minsSecs.forEach((element) => {
      fireEvent.change(element, { target: { value: '99' } });
      fireEvent.blur(getByDisplayValue('99'));
    });
    fireEvent.change(getByDisplayValue('AM'), {
      target: { value: 'ok' },
    });
    fireEvent.blur(getByDisplayValue('ok'));
    expect(getByDisplayValue('12')).toBeTruthy();
    expect(getAllByDisplayValue('00').length).toBe(2);
    expect(getByDisplayValue('AM')).toBeTruthy();
  });
});
