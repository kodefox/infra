import React, { useState, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextInput from '../TextInput/TextInput';

import { HourFormat } from '../../helpers/timeChecker';
import useTheme from '../../helpers/useTheme';
import { createTimeForDisplay } from '../../helpers/displayTime';
import { TimePickerProps } from './types';
import Text from '../Text';

export default function TimePicker(props: TimePickerProps) {
  let {
    format = '12' as HourFormat,
    date,
    placeholder = '',
    title = '',
    locale,
    onChangeTime,
    style,
  } = props;
  let { colors, style: themeStyle } = useTheme();

  let [visible, setVisible] = useState(false);

  let use24Hour = format === '24';

  let toggleModal = () => setVisible(!visible);
  let changeDate = (d: Date) => {
    let newDate = d.toISOString();
    toggleModal();
    onChangeTime && onChangeTime(newDate);
  };
  let displayTime = useMemo(() => createTimeForDisplay(date, format), [
    date,
    format,
  ]);

  const CustomHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTextStyle}>{title}</Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
        <TextInput
          disabled
          mode="outlined"
          label="Time"
          value={displayTime}
          placeholder={placeholder}
          pointerEvents="none"
          containerStyle={{
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}
          style={[
            { backgroundColor: colors.surface },
            themeStyle?.timePicker?.style,
            style,
          ]}
        />
      </TouchableOpacity>
      <DateTimePicker
        date={new Date(date)}
        customHeaderIOS={title ? CustomHeaderComponent : undefined}
        // NOTE: Android only
        is24Hour={use24Hour}
        // NOTE: If locale is not provided, use `en-GB` for 12h format
        locale={locale || use24Hour ? 'en-GB' : 'en-US'}
        isVisible={visible}
        mode="time"
        onConfirm={changeDate}
        onCancel={toggleModal}
      />
    </>
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
