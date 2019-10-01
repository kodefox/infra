import React, { useMemo } from 'react';
import {
  Calendar as WixCalendar,
  CalendarMarkingProps,
  CalendarBaseProps,
  CalendarTheme,
} from 'react-native-calendars';

import resolveTextStyle from '../../helpers/resolveTextStyle';
import useTheme from '../../helpers/useTheme';

type Props = CalendarMarkingProps & CalendarBaseProps & { textPreset?: string };

export default function Calendar(props: Props) {
  let { fonts, colors } = useTheme();

  let { theme, textPreset = 'default', ...otherProps } = props;
  let resolvedTextStyle = useMemo(
    () => resolveTextStyle(fonts || {}, textPreset, '400', 'normal'),
    [fonts],
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

  return <WixCalendar {...otherProps} theme={calendarTheme} />;
}
