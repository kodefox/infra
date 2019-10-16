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
          label="Hrs"
          value={mockHours24}
          format="24"
          onChangeText={(h) => (mockHours24 = h)}
        />
        <TimePickerInput
          label="Hrs"
          value={mockHours}
          format="12"
          onChangeText={(h) => (mockHours = h)}
        />
        <TimePickerInput
          label="Mins"
          value={mockMinutes}
          format="12"
          onChangeText={(m) => (mockMinutes = m)}
        />
        <TimePickerInput
          label="Secs"
          value={mockSeconds}
          format="12"
          onChangeText={(s) => (mockSeconds = s)}
        />
        <TimePickerInput
          label="Mid"
          value={mockMeridiem}
          format="12"
          onChangeText={(mid) => (mockMeridiem = mid)}
        />
      </>,
    );
    getAllByTestId('arrowUpHrs').forEach((element) => {
      fireEvent.click(element);
    });
    fireEvent.click(getByTestId('arrowUpMins'));
    fireEvent.click(getByTestId('arrowUpSecs'));
    fireEvent.click(getByTestId('arrowUpMid'));
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
          label="Hrs"
          value={mockHours}
          format="12"
          onChangeText={(h) => (mockHours = h)}
        />
        <TimePickerInput
          label="Mins"
          value={mockMinutes}
          format="12"
          onChangeText={(m) => (mockMinutes = m)}
        />
        <TimePickerInput
          label="Secs"
          value={mockSeconds}
          format="12"
          onChangeText={(s) => (mockSeconds = s)}
        />
        <TimePickerInput
          label="Mid"
          value={mockMeridiem}
          format="12"
          onChangeText={(mid) => (mockMeridiem = mid)}
        />
      </>,
    );
    fireEvent.click(getByTestId('arrowDownHrs'));
    fireEvent.click(getByTestId('arrowDownMins'));
    fireEvent.click(getByTestId('arrowDownSecs'));
    fireEvent.click(getByTestId('arrowDownMid'));
    expect(mockHours).toBe('11');
    expect(mockMinutes).toBe('59');
    expect(mockSeconds).toBe('19');
    expect(mockMeridiem).toBe('PM');
  });
});
