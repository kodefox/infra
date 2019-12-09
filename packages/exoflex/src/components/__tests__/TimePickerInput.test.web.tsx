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
      fireEvent.click(element);
    });
    fireEvent.click(getByTestId('arrowUpmm'));
    fireEvent.click(getByTestId('arrowUpss'));
    fireEvent.click(getByTestId('arrowUpam/pm'));
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
    fireEvent.click(getByTestId('arrowDownhh'));
    fireEvent.click(getByTestId('arrowDownmm'));
    fireEvent.click(getByTestId('arrowDownss'));
    fireEvent.click(getByTestId('arrowDownam/pm'));
    expect(mockHours).toBe('11');
    expect(mockMinutes).toBe('59');
    expect(mockSeconds).toBe('19');
    expect(mockMeridiem).toBe('PM');
  });
});
