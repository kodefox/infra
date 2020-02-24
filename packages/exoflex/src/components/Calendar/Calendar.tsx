import React, { useMemo } from 'react';
import {
  Calendar as WixCalendar,
  CalendarMarkingProps,
  CalendarBaseProps,
  CalendarTheme,
} from 'react-native-calendars';

import resolveTextStyle from '../../helpers/resolveTextStyle';
import useTheme from '../../helpers/useTheme';

export type CalendarProps = CalendarMarkingProps &
  CalendarBaseProps & { textPreset?: string };

export default function Calendar(props: CalendarProps) {
  let { fonts, colors, style: themeStyle } = useTheme();

  let { theme, textPreset = 'default', style, ...otherProps } = props;
  let resolvedTextStyle = useMemo(
    () => resolveTextStyle(fonts || {}, textPreset, '400', 'normal'),
    [fonts, textPreset],
  );

  let calendarTheme: Partial<CalendarTheme> = { ...theme };
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
