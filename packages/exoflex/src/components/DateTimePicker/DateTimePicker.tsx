import React from 'react';
import RNDateTimePicker from 'react-native-modal-datetime-picker';

import { DateTimePickerProps, DateTimePickerMode } from './types';

export default function DateTimePicker(props: DateTimePickerProps) {
  let {
    onCancel,
    onConfirm,
    date = new Date().toISOString(),
    mode = 'datetime' as DateTimePickerMode,
    use24Hour = false,
    locale,
    title,
    ...otherProps
  } = props;

  return (
    <RNDateTimePicker
      mode={mode}
      date={date.trim() === '' ? new Date() : new Date(date)}
      is24Hour={use24Hour}
      // NOTE: If locale is not provided, use `en-GB` for 12h format
      locale={locale || use24Hour ? 'en-GB' : 'en-US'}
      onCancel={() => onCancel()}
      onConfirm={(newDate) => onConfirm(newDate.toISOString())}
      headerTextIOS={title}
      {...otherProps}
    />
  );
}
