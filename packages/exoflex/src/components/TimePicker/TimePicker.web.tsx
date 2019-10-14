import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TimePickerInput from './TimePickerInput';

import {
  isHoursFormatValid,
  isMinutesFormatValid,
  isSecondsFormatValid,
  HourFormat,
  Meridiem,
} from '../../helpers/timeChecker';
import convertTimeToDate from '../../helpers/convertTimeToDate';
import { TimePickerProps } from './types';

export default function TimePicker(props: TimePickerProps) {
  let { format = '12' as HourFormat, date: initialDate, onChangeTime } = props;

  let [hour, setHour] = useState('12');
  let [minute, setMinute] = useState('00');
  let [second, setSecond] = useState('00');
  let [meridiem, setMeridiem] = useState<Meridiem>('AM');

  useEffect(() => {
    let utcString = convertTimeToDate(
      initialDate,
      hour,
      minute,
      second,
      meridiem,
    );
    onChangeTime && onChangeTime(utcString);
  }, [hour, minute, second, meridiem]);

  let changeHour = (newHour: string) => setHour(newHour);
  let changeMinute = (newMinute: string) => setMinute(newMinute);
  let changeSecond = (newSecond: string) => setSecond(newSecond);
  let changeMeridiem = (newMeridiem: string) =>
    setMeridiem(newMeridiem as Meridiem);

  let checkHour = () => {
    !isHoursFormatValid(hour, format) && setHour('12');
  };
  let checkMinute = () => {
    !isMinutesFormatValid(minute) && setMinute('00');
  };
  let checkSecond = () => {
    !isSecondsFormatValid(second) && setSecond('00');
  };
  let checkMeridiem = () => {
    !(meridiem === 'AM' || meridiem === 'PM') && setMeridiem('AM');
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TimePickerInput
        format={format}
        label="Hrs"
        value={hour}
        onChangeText={changeHour}
        onBlur={checkHour}
      />
      <TimePickerInput
        format={format}
        label="Mins"
        value={minute}
        onChangeText={changeMinute}
        onBlur={checkMinute}
      />
      <TimePickerInput
        format={format}
        label="Secs"
        value={second}
        onChangeText={changeSecond}
        onBlur={checkSecond}
      />
      {format === '12' && (
        <TimePickerInput
          format={format}
          label="Mid"
          value={meridiem}
          onChangeText={changeMeridiem}
          onBlur={checkMeridiem}
        />
      )}
    </View>
  );
}
