import React, { useCallback } from 'react';
import RNDateTimePicker from 'react-native-modal-datetime-picker';
import { StyleSheet, View } from 'react-native';

import { DateTimePickerProps, DateTimePickerMode } from './types';
import useTheme from '../../helpers/useTheme';
import Text from '../Text';

export default function DateTimePicker(props: DateTimePickerProps) {
  let {
    onCancel,
    onConfirm,
    date = new Date().toISOString(),
    mode = 'datetime' as DateTimePickerMode,
    use24Hour = false,
    locale,
    title,
    modalStyleIOS,
    pickerContainerStyleIOS,
    ...otherProps
  } = props;

  const { style: themeStyle } = useTheme();

  const CustomHeaderComponent = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextStyle}>{title}</Text>
      </View>
    );
  }, [title]);

  return (
    <RNDateTimePicker
      mode={mode}
      date={date.trim() === '' ? new Date() : new Date(date)}
      is24Hour={use24Hour}
      // NOTE: If locale is not provided, use `en-GB` for 12h format
      locale={locale || use24Hour ? 'en-GB' : 'en-US'}
      onCancel={() => onCancel()}
      onConfirm={(newDate) => onConfirm(newDate.toISOString())}
      customHeaderIOS={title ? CustomHeaderComponent : undefined}
      modalStyleIOS={StyleSheet.flatten([
        themeStyle?.dateTimePicker?.modalStyleIOS,
        modalStyleIOS,
      ])}
      pickerContainerStyleIOS={StyleSheet.flatten([
        themeStyle?.dateTimePicker?.pickerContainerStyleIOS,
        pickerContainerStyleIOS,
      ])}
      display="spinner"
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(158, 150, 150, .1)',
    padding: 14,
  },
  headerTextStyle: {
    fontSize: 20,
    color: '#8f8f8f',
    letterSpacing: -0.5,
  },
});
