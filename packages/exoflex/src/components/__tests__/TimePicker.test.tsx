import React from 'react';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
  cleanup,
} from '@testing-library/react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import TimePicker from '../TimePicker/TimePicker.web';

const date = '2019-10-10T11:03:11.044Z';

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
            ? renderWeb(<TimePicker date={date} />)
            : render(<TimePicker date={date} />);
        expect(getByDisplayValue('12')).toBeTruthy();
        expect(getAllByDisplayValue('00').length).toBe(2);
        expect(getByDisplayValue('AM')).toBeTruthy();
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
            ? renderWeb(<TimePicker date={date} format="24" />)
            : render(<TimePicker date={date} format="24" />);
        expect(getByDisplayValue('12')).toBeTruthy();
        expect(getAllByDisplayValue('00').length).toBe(2);
        expect(queryByDisplayValue('AM')).toBeFalsy();
      });
    },
    [{ name: 'on web', platform: 'web' }],
  );

  cases(
    'should be able to change time and meridiem via textinput',
    (opts) => {
      let platform = opts.platform as Platforms;
      let mockOnChangeTime = jest.fn();
      withPlatform(platform, () => {
        if (platform === 'web') {
          let { getByDisplayValue, getAllByDisplayValue } = renderWeb(
            <TimePicker date={date} onChangeTime={mockOnChangeTime} />,
          );
          fireEventWeb.change(getByDisplayValue('12'), {
            target: { value: '10' },
          });
          let minsSecs = getAllByDisplayValue('00');
          minsSecs.forEach((element) => {
            fireEventWeb.change(element, { target: { value: '59' } });
          });
          fireEventWeb.change(getByDisplayValue('AM'), {
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
            <TimePicker date={date} />,
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
          fireEventWeb.change(getByDisplayValue('AM'), {
            target: { value: 'ok' },
          });
          fireEventWeb.blur(getByDisplayValue('ok'));
          expect(getByDisplayValue('12')).toBeTruthy();
          expect(getAllByDisplayValue('00').length).toBe(2);
          expect(getByDisplayValue('AM')).toBeTruthy();
        }
      });
    },
    [{ name: 'on web', platform: 'web' }],
  );
});
