import React, { useMemo } from 'react';
import {
  Calendar as WixCalendar,
  CalendarProps as WixCalendarProps,
} from 'react-native-calendars';

import resolveTextStyle from '../../helpers/resolveTextStyle';
import useTheme from '../../helpers/useTheme';

export type CalendarProps = WixCalendarProps & { textPreset?: string };
export type CalendarTheme = Pick<CalendarProps, 'theme'>;

export default function Calendar(props: CalendarProps) {
  let { fonts, colors, style: themeStyle } = useTheme();

  let { theme, textPreset = 'default', style, ...otherProps } = props;
  let resolvedTextStyle = useMemo(
    () => resolveTextStyle(fonts || {}, textPreset, '400', 'normal'),
    [fonts, textPreset],
  );

  let calendarTheme: CalendarTheme['theme'] = { ...theme };
  if (resolvedTextStyle) {
    let { fontFamily, fontSize } = resolvedTextStyle;
    calendarTheme = {
      textDayFontFamily: fontFamily,
      textMonthFontFamily: fontFamily,
      textDayHeaderFontFamily: fontFamily,
      textDayFontSize: fontSize,
      textMonthFontSize: fontSize,
      textDayHeaderFontSize: fontSize,
      todayTextColor: colors.primary,
      selectedDayBackgroundColor: colors.primary,
      ...theme,
    };
  }

  return (
    <WixCalendar
      {...otherProps}
      style={[themeStyle?.calendar?.style, style]}
      theme={calendarTheme}
    />
  );
}
