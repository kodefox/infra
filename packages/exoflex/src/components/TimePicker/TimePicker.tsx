import React, { useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextInput from '../TextInput/TextInput';

import { HourFormat } from '../../helpers/timeChecker';
import useTheme from '../../helpers/useTheme';
import { TimePickerProps } from './types';

export default function TimePicker(props: TimePickerProps) {
  let {
    format = '12' as HourFormat,
    date: initialDate,
    onChangeTime,
    style,
  } = props;
  let { colors } = useTheme();

  let [visible, setVisible] = useState(false);
  let [date, setDate] = useState(initialDate);

  let is24Hour = format === '24';

  let toggleModal = () => setVisible(!visible);
  let changeDate = (d: Date) => {
    let newDate = d.toISOString();
    setDate(newDate);
    onChangeTime && onChangeTime(newDate);
    toggleModal();
  };
  let displayTime = useMemo(() => {
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
          containerStyle={{
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}
          style={[{ backgroundColor: colors.surface }, style]}
        />
      </TouchableOpacity>
      <DateTimePicker
        date={new Date(initialDate)}
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
