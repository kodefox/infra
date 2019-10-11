import React from 'react';
import RNDateTimePicker from 'react-native-modal-datetime-picker';

import { DateTimePickerProps, DateTimePickerMode } from './types';

export default function DateTimePicker(props: DateTimePickerProps) {
  let {
    onCancel,
    onConfirm,
    date = new Date().toISOString(),
    mode = 'datetime' as DateTimePickerMode,
    ...otherProps
  } = props;

  return (
    <RNDateTimePicker
      mode={mode}
      date={new Date(date)}
      onCancel={() => onCancel()}
      onConfirm={(date) => onConfirm(date.toISOString())}
      {...otherProps}
    />
  );
}
