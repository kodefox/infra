import React from 'react';
import { render as renderWeb } from '@testing-library/react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import cases from 'jest-in-case';
import { Calendar } from '../Calendar';

type Platforms = 'web' | 'ios' | 'android';

const BasicCalendar = () => <Calendar />;
const CustomTextPresetCalendar = () => <Calendar textPreset="rubik" />;

describe('Calendar', () => {
  cases(
    'should render normally',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web'
            ? renderWeb(<BasicCalendar />)
            : render(<BasicCalendar />);
        expect(getByText('Sun')).toBeTruthy();
        expect(getByText('Mon')).toBeTruthy();
        expect(getByText('Tue')).toBeTruthy();
        expect(getByText('Wed')).toBeTruthy();
        expect(getByText('Thu')).toBeTruthy();
        expect(getByText('Fri')).toBeTruthy();
        expect(getByText('Sat')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );

  cases(
    'should render with custom text preset',
    (opts) => {
      let platform = opts.platform as Platforms;
      withPlatform(platform, () => {
        let { getByText } =
          platform === 'web'
            ? renderWeb(<CustomTextPresetCalendar />)
            : render(<CustomTextPresetCalendar />);
        expect(getByText('Sun')).toBeTruthy();
        expect(getByText('Mon')).toBeTruthy();
        expect(getByText('Tue')).toBeTruthy();
        expect(getByText('Wed')).toBeTruthy();
        expect(getByText('Thu')).toBeTruthy();
        expect(getByText('Fri')).toBeTruthy();
        expect(getByText('Sat')).toBeTruthy();
      });
    },
    [
      { name: 'on web', platform: 'web' },
      { name: 'on ios', platform: 'ios' },
      { name: 'on android', platform: 'android' },
    ],
  );
});
