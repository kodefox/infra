import React from 'react';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
  cleanup,
} from '@testing-library/react';
import { render, fireEvent } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import TimePicker, { convertTimeToDate } from '../TimePicker';

describe('convertTimeToDate', () => {
  it('should return valid date from 24h format', () => {
    expect(convertTimeToDate('12', '00', '00').split('.')[0]).toBe(
      new Date(new Date().setHours(12, 0, 0)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate('01', '00', '00').split('.')[0]).toBe(
      new Date(new Date().setHours(1, 0, 0)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate('23', '59', '01').split('.')[0]).toBe(
      new Date(new Date().setHours(23, 59, 1)).toISOString().split('.')[0],
    );
  });

  it('should return valid date from 12h format', () => {
    expect(convertTimeToDate('11', '59', '01', 'pm').split('.')[0]).toBe(
      new Date(new Date().setHours(23, 59, 1)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate('11', '59', '01', 'am').split('.')[0]).toBe(
      new Date(new Date().setHours(11, 59, 1)).toISOString().split('.')[0],
    );
  });
});

type Platforms = 'web' | 'ios' | 'android';

describe('TimePicker', () => {
  afterEach(() => {
    cleanup();
  });

  cases(
    'should render normally with format 12h',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByDisplayValue, getAllByDisplayValue } =
          platform === 'web'
            ? renderWeb(<TimePicker />)
            : render(<TimePicker />);
        expect(getByDisplayValue('12')).toBeTruthy();
        expect(getAllByDisplayValue('00').length).toBe(2);
        expect(getByDisplayValue('am')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should render normally with format 24h',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByDisplayValue, getAllByDisplayValue, queryByDisplayValue } =
          platform === 'web'
            ? renderWeb(<TimePicker format="24" />)
            : render(<TimePicker format="24" />);
        expect(getByDisplayValue('12')).toBeTruthy();
        expect(getAllByDisplayValue('00').length).toBe(2);
        expect(queryByDisplayValue('am')).toBeFalsy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should be able to change time and midnight via textinput',
    (opts) => {
      let platform = opts.platform as Platforms;
      let mockOnChangeTime = jest.fn();
      withPlatform(platform, () => {
        if (platform === 'web') {
          let { getByDisplayValue, getAllByDisplayValue } = renderWeb(
            <TimePicker onChangeTime={mockOnChangeTime} />,
          );
          fireEventWeb.change(getByDisplayValue('12'), {
            target: { value: '10' },
          });
          let minsSecs = getAllByDisplayValue('00');
          minsSecs.forEach((element) => {
            fireEventWeb.change(element, { target: { value: '59' } });
          });
          fireEventWeb.change(getByDisplayValue('am'), {
            target: { value: 'pm' },
          });
          expect(getByDisplayValue('10')).toBeTruthy();
          expect(getAllByDisplayValue('59').length).toBe(2);
          expect(getByDisplayValue('pm')).toBeTruthy();
          expect(mockOnChangeTime).toHaveBeenCalled();
        } else {
          let { getByDisplayValue, getAllByDisplayValue } = render(
            <TimePicker onChangeTime={mockOnChangeTime} />,
          );
          fireEvent.changeText(getByDisplayValue('12'), '10');
          let minsSecs = getAllByDisplayValue('00');
          minsSecs.forEach((element) => {
            fireEvent.changeText(element, '59');
          });
          fireEvent.changeText(getByDisplayValue('am'), 'pm');
          expect(getByDisplayValue('10')).toBeTruthy();
          expect(getAllByDisplayValue('59').length).toBe(2);
          expect(getByDisplayValue('pm')).toBeTruthy();
          expect(mockOnChangeTime).toHaveBeenCalled();
        }
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should check the value on blur',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        if (platform === 'web') {
          let { getByDisplayValue, getAllByDisplayValue } = renderWeb(
            <TimePicker />,
          );
          fireEventWeb.change(getByDisplayValue('12'), {
            target: { value: '36' },
          });
          fireEventWeb.blur(getByDisplayValue('36'));
          let minsSecs = getAllByDisplayValue('00');
          minsSecs.forEach((element) => {
            fireEventWeb.change(element, { target: { value: '99' } });
            fireEventWeb.blur(getByDisplayValue('99'));
          });
          fireEventWeb.change(getByDisplayValue('am'), {
            target: { value: 'ok' },
          });
          fireEventWeb.blur(getByDisplayValue('ok'));
          expect(getByDisplayValue('12')).toBeTruthy();
          expect(getAllByDisplayValue('00').length).toBe(2);
          expect(getByDisplayValue('am')).toBeTruthy();
        }
      });
    },
    [{ name: 'on web', platform: 'web' }],
  );

  cases(
    'should increase time and midnight when arrow up pressed',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        if (platform === 'web') {
          let {
            getByTestId,
            getByDisplayValue,
            getAllByDisplayValue,
          } = renderWeb(<TimePicker />);
          fireEventWeb.mouseDown(getByTestId('arrowUpHours'));
          fireEventWeb.mouseUp(getByTestId('arrowUpHours'));

          fireEventWeb.mouseDown(getByTestId('arrowUpMinutes'));
          fireEventWeb.mouseUp(getByTestId('arrowUpMinutes'));

          fireEventWeb.mouseDown(getByTestId('arrowUpSeconds'));
          fireEventWeb.mouseUp(getByTestId('arrowUpSeconds'));

          fireEventWeb.mouseDown(getByTestId('arrowUpMidnight'));
          fireEventWeb.mouseUp(getByTestId('arrowUpMidnight'));
          expect(getAllByDisplayValue('01').length).toBe(3);
          expect(getByDisplayValue('pm')).toBeTruthy();
        } else {
          let { getByTestId, getByDisplayValue, getAllByDisplayValue } = render(
            <TimePicker />,
          );
          fireEvent.press(getByTestId('arrowUpHours'));
          fireEvent.press(getByTestId('arrowUpMinutes'));
          fireEvent.press(getByTestId('arrowUpSeconds'));
          fireEvent.press(getByTestId('arrowUpMidnight'));
          expect(getAllByDisplayValue('01').length).toBe(3);
          expect(getByDisplayValue('pm')).toBeTruthy();
        }
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should decrease time and midnight when arrow down pressed',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        if (platform === 'web') {
          let {
            getByTestId,
            getByDisplayValue,
            getAllByDisplayValue,
          } = renderWeb(<TimePicker />);
          fireEventWeb.mouseDown(getByTestId('arrowDownHours'));
          fireEventWeb.mouseUp(getByTestId('arrowDownHours'));

          fireEventWeb.mouseDown(getByTestId('arrowDownMinutes'));
          fireEventWeb.mouseUp(getByTestId('arrowDownMinutes'));

          fireEventWeb.mouseDown(getByTestId('arrowDownSeconds'));
          fireEventWeb.mouseUp(getByTestId('arrowDownSeconds'));

          fireEventWeb.mouseDown(getByTestId('arrowDownMidnight'));
          fireEventWeb.mouseUp(getByTestId('arrowDownMidnight'));
          expect(getByDisplayValue('11')).toBeTruthy();
          expect(getAllByDisplayValue('59').length).toBe(2);
          expect(getByDisplayValue('pm')).toBeTruthy();
        } else {
          let { getByTestId, getByDisplayValue, getAllByDisplayValue } = render(
            <TimePicker />,
          );
          fireEvent.press(getByTestId('arrowDownHours'));
          fireEvent.press(getByTestId('arrowDownMinutes'));
          fireEvent.press(getByTestId('arrowDownSeconds'));
          fireEvent.press(getByTestId('arrowDownMidnight'));
          expect(getByDisplayValue('11')).toBeTruthy();
          expect(getAllByDisplayValue('59').length).toBe(2);
          expect(getByDisplayValue('pm')).toBeTruthy();
        }
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );
});
