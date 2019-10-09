import React from 'react';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
  cleanup,
} from '@testing-library/react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import TimePicker, { convertTimeToDate } from '../TimePicker/TimePicker';

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
    [{ name: 'on web', platform: 'web' }],
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
    [{ name: 'on web', platform: 'web' }],
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
        }
      });
    },
    [{ name: 'on web', platform: 'web' }],
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
});
