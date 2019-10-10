import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import TimePickerInput from './TimePickerInput';

import {
  checkHourFormat,
  checkMinuteFormat,
  checkSecondFormat,
  HourFormat,
  Midnight,
} from '../../helpers/timeChecker';
import convertTimeToDate from '../../helpers/convertTimeToDate';
import { TimePickerProps } from './types';

export default function TimePicker(props: TimePickerProps) {
  let { format = '12' as HourFormat, date: initialDate, onChangeTime } = props;

  let [hour, setHour] = useState('12');
  let [minute, setMinute] = useState('00');
  let [second, setSecond] = useState('00');
  let [midnight, setMidnight] = useState<Midnight>('am');

  useEffect(() => {
    let utcString = convertTimeToDate(
      initialDate,
      hour,
      minute,
      second,
      midnight,
    );
    onChangeTime && onChangeTime(utcString);
  }, [hour, minute, second, midnight]);

  let changeHour = useCallback((newHour: string) => setHour(newHour), []);
  let changeMinute = useCallback(
    (newMinute: string) => setMinute(newMinute),
    [],
  );
  let changeSecond = useCallback(
    (newSecond: string) => setSecond(newSecond),
    [],
  );
  let changeMidnight = useCallback(
    (newMidnight: string) => setMidnight(newMidnight as Midnight),
    [],
  );

  let checkHour = () => {
    !checkHourFormat(hour, format) && setHour('12');
  };
  let checkMinute = () => {
    !checkMinuteFormat(minute) && setMinute('00');
  };
  let checkSecond = () => {
    !checkSecondFormat(second) && setSecond('00');
  };
  let checkMidnight = () => {
    !(midnight === 'am' || midnight === 'pm') && setMidnight('am');
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
          value={midnight}
          onChangeText={changeMidnight}
          onBlur={checkMidnight}
        />
      )}
    </View>
  );
}
