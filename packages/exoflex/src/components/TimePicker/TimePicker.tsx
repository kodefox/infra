import React, { useState, useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextInput from '../TextInput/TextInput';

import { HourFormat } from '../../helpers/timeChecker';
import useTheme from '../../helpers/useTheme';
import { TimePickerProps } from './types';

export default function TimePicker(props: TimePickerProps) {
  let { format = '12' as HourFormat, onChangeTime, style } = props;
  let { colors } = useTheme();

  let [visible, setVisible] = useState(false);
  let [date, setDate] = useState('');

  let is24Hour = format === '24';

  let toggleModal = () => setVisible(!visible);
  let changeDate = (newDate: Date) => {
    setDate(newDate.toISOString());
    onChangeTime && onChangeTime(date);
    toggleModal();
  };
  let displayTime = useMemo(() => {
    if (date === '') {
      return date;
    }
    let d = new Date(date);
    let hour = d
      .getHours()
      .toString()
      .padStart(2, '0');
    let mins = d
      .getMinutes()
      .toString()
      .padStart(2, '0');
    let secs = d
      .getSeconds()
      .toString()
      .padStart(2, '0');
    if (format === '12') {
      let newHour = ~~hour - 12;
      let midnight = ~~hour > 12 ? 'AM' : 'PM';
      return `${newHour}:${mins}:${secs} ${midnight}`;
    }
    return `${hour}:${mins}:${secs}`;
  }, [date]);

  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
        <TextInput
          disabled
          mode="outlined"
          label="Time"
          value={displayTime}
          placeholder="Select the time"
          pointerEvents="none"
          containerStyle={[
            styles.bgColor,
            {
              borderColor: colors.border,
            },
          ]}
          style={[styles.bgColor, style]}
        />
      </TouchableOpacity>
      <DateTimePicker
        titleIOS="Select the time"
        // NOTE: Android only
        is24Hour={is24Hour}
        // NOTE: For determining 12h or 24h in iOS
        locale={is24Hour ? 'id-ID' : 'en-US'}
        isVisible={visible}
        mode="time"
        onConfirm={changeDate}
        onCancel={toggleModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: 'white',
  },
});
