import React from 'react';
import RNDateTimePicker from 'react-native-modal-datetime-picker';
import { StyleSheet } from 'react-native';

import useTheme from '../../helpers/useTheme';

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
    cancelButtonContainerStyleIOS,
    contentContainerStyleIOS,
    datePickerContainerStyleIOS,
    titleStyle,
    ...otherProps
  } = props;

  const { style: themeStyle } = useTheme();

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
      cancelButtonContainerStyleIOS={StyleSheet.flatten([
        themeStyle?.dateTimePicker?.cancelButtonContainerStyleIOS,
        cancelButtonContainerStyleIOS,
      ])}
      contentContainerStyleIOS={StyleSheet.flatten([
        themeStyle?.dateTimePicker?.contentContainerStyleIOS,
        contentContainerStyleIOS,
      ])}
      datePickerContainerStyleIOS={StyleSheet.flatten([
        themeStyle?.dateTimePicker?.datePickerContainerStyleIOS,
        datePickerContainerStyleIOS,
      ])}
      titleStyle={StyleSheet.flatten([
        themeStyle?.dateTimePicker?.titleStyle,
        titleStyle,
      ])}
      {...otherProps}
    />
  );
}
