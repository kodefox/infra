import React, { useMemo } from 'react';
import {
  Calendar as WixCalendar,
  CalendarMarkingProps,
  CalendarBaseProps,
  CalendarTheme,
} from 'react-native-calendars';

import resolveTextStyle from '../../helpers/resolveTextStyle';
import useTheme from '../../helpers/useTheme';

type Props = CalendarMarkingProps & CalendarBaseProps;

export default function Calendar(props: Props) {
  let { fonts } = useTheme();
  let resolvedTextStyle = useMemo(
    () => resolveTextStyle(fonts || {}, 'default', '400', 'normal'),
    [fonts],
  );

  let calendarTheme: Partial<CalendarTheme> = {};
  if (resolvedTextStyle) {
    let { fontFamily, fontSize } = resolvedTextStyle;
    calendarTheme = {
      textDayFontFamily: fontFamily,
      textMonthFontFamily: fontFamily,
      textDayHeaderFontFamily: fontFamily,
      textDayFontSize: fontSize,
      textMonthFontSize: fontSize,
      textDayHeaderFontSize: fontSize,
    };
  }

  return <WixCalendar {...props} theme={calendarTheme} />;
}
