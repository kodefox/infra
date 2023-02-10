import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '../../../test/customFireEvent.web';
import TimePickerInput from '../TimePicker/TimePickerInput';

describe('TimePickerInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('should increase time and meridiem when arrow up pressed', () => {
    let mockHours = '12';
    let mockHours24 = '23';
    let mockMinutes = '00';
    let mockSeconds = '59';
    let mockMeridiem = 'AM';
    let { getByTestId, getAllByTestId } = render(
      <>
        <TimePickerInput
          placeholder="hh"
          value={mockHours24}
          format="24"
          onChangeText={(h) => (mockHours24 = h)}
        />
        <TimePickerInput
          placeholder="hh"
          value={mockHours}
          format="12"
          onChangeText={(h) => (mockHours = h)}
        />
        <TimePickerInput
          placeholder="mm"
          value={mockMinutes}
          format="12"
          onChangeText={(m) => (mockMinutes = m)}
        />
        <TimePickerInput
          placeholder="ss"
          value={mockSeconds}
          format="12"
          onChangeText={(s) => (mockSeconds = s)}
        />
        <TimePickerInput
          placeholder="am/pm"
          value={mockMeridiem}
          format="12"
          onChangeText={(mid) => (mockMeridiem = mid)}
        />
      </>,
    );
    getAllByTestId('arrowUphh').forEach((element) => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    fireEvent(
      getByTestId('arrowUpmm'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByTestId('arrowUpss'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByTestId('arrowUpam/pm'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockHours24).toBe('00');
    expect(mockHours).toBe('01');
    expect(mockMinutes).toBe('01');
    expect(mockSeconds).toBe('00');
    expect(mockMeridiem).toBe('PM');
  });

  it('should decrease time and meridiem when arrow down pressed', () => {
    let mockHours = '12';
    let mockMinutes = '00';
    let mockSeconds = '20';
    let mockMeridiem = 'AM';
    let { getByTestId } = render(
      <>
        <TimePickerInput
          placeholder="hh"
          value={mockHours}
          format="12"
          onChangeText={(h) => (mockHours = h)}
        />
        <TimePickerInput
          placeholder="mm"
          value={mockMinutes}
          format="12"
          onChangeText={(m) => (mockMinutes = m)}
        />
        <TimePickerInput
          placeholder="ss"
          value={mockSeconds}
          format="12"
          onChangeText={(s) => (mockSeconds = s)}
        />
        <TimePickerInput
          placeholder="am/pm"
          value={mockMeridiem}
          format="12"
          onChangeText={(mid) => (mockMeridiem = mid)}
        />
      </>,
    );
    fireEvent(
      getByTestId('arrowDownhh'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByTestId('arrowDownmm'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByTestId('arrowDownss'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      getByTestId('arrowDownam/pm'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockHours).toBe('11');
    expect(mockMinutes).toBe('59');
    expect(mockSeconds).toBe('19');
    expect(mockMeridiem).toBe('PM');
  });
});
