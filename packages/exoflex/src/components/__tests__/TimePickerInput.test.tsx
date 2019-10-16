import React from 'react';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
  cleanup,
} from '@testing-library/react';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import TimePickerInput from '../TimePicker/TimePickerInput';

type Platforms = 'web' | 'ios' | 'android';

describe('TimePickerInput', () => {
  afterEach(() => {
    cleanup();
  });

  cases(
    'should increase time and meridiem when arrow up pressed',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        if (platform === 'web') {
          let mockHours = '12';
          let mockHours24 = '23';
          let mockMinutes = '00';
          let mockSeconds = '59';
          let mockMeridiem = 'AM';
          let { getByTestId, getAllByTestId } = renderWeb(
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
            fireEventWeb.mouseDown(element);
            fireEventWeb.mouseUp(element);
          });

          fireEventWeb.mouseDown(getByTestId('arrowUpMins'));
          fireEventWeb.mouseUp(getByTestId('arrowUpMins'));

          fireEventWeb.mouseDown(getByTestId('arrowUpSecs'));
          fireEventWeb.mouseUp(getByTestId('arrowUpSecs'));

          fireEventWeb.mouseDown(getByTestId('arrowUpMid'));
          fireEventWeb.mouseUp(getByTestId('arrowUpMid'));
          expect(mockHours24).toBe('00');
          expect(mockHours).toBe('01');
          expect(mockMinutes).toBe('01');
          expect(mockSeconds).toBe('00');
          expect(mockMeridiem).toBe('PM');
        }
      });
    },
    [{ name: 'on web', platform: 'web' }],
  );

  cases(
    'should increase time and meridiem when arrow down pressed',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        if (platform === 'web') {
          let mockHours = '12';
          let mockMinutes = '00';
          let mockSeconds = '20';
          let mockMeridiem = 'AM';
          let { getByTestId } = renderWeb(
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
          fireEventWeb.mouseDown(getByTestId('arrowDownHrs'));
          fireEventWeb.mouseUp(getByTestId('arrowDownHrs'));

          fireEventWeb.mouseDown(getByTestId('arrowDownMins'));
          fireEventWeb.mouseUp(getByTestId('arrowDownMins'));

          fireEventWeb.mouseDown(getByTestId('arrowDownSecs'));
          fireEventWeb.mouseUp(getByTestId('arrowDownSecs'));

          fireEventWeb.mouseDown(getByTestId('arrowDownMid'));
          fireEventWeb.mouseUp(getByTestId('arrowDownMid'));
          expect(mockHours).toBe('11');
          expect(mockMinutes).toBe('59');
          expect(mockSeconds).toBe('19');
          expect(mockMeridiem).toBe('PM');
        }
      });
    },
    [{ name: 'on web', platform: 'web' }],
  );
});
