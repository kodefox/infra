import React from 'react';
import Calendar from '../Calendar';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';

describe('Calendar', () => {
  const theme = { markColor: 'orange', todayTextColor: 'white' };

  it('should render basic calendar on android', () => {
    withPlatform('android', () => {
      let component = render(<Calendar theme={theme} />);
      // expect(getByText('August')).toBeTruthy();
      expect(component).toBeTruthy();
    });
  });
});
