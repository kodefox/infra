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
import {
  convertTimeToDate,
  convertDateToLocalTime,
} from '../../helpers/resolveTime';
import { TimePickerProps } from './types';

export default function TimePicker(props: TimePickerProps) {
  let { format = '12' as HourFormat, date, onChangeTime } = props;
  let [h, m, s, mer] = convertDateToLocalTime(date, format);
  let isDateEmpty = date === '';

  let [hour, setHour] = useState(isDateEmpty ? '12' : h);
  let [minute, setMinute] = useState(isDateEmpty ? '00' : m);
  let [second, setSecond] = useState(isDateEmpty ? '00' : s);
  let [meridiem, setMeridiem] = useState<Meridiem>(
    isDateEmpty ? 'AM' : (mer as Meridiem),
  );

  useEffect(() => {
    let utcString = convertTimeToDate(date, hour, minute, second, meridiem);
    onChangeTime && onChangeTime(utcString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        value={hour}
        placeholder="hh"
        onChangeText={changeHour}
        onBlur={checkHour}
      />
      <TimePickerInput
        format={format}
        value={minute}
        placeholder="mm"
        onChangeText={changeMinute}
        onBlur={checkMinute}
      />
      <TimePickerInput
        format={format}
        value={second}
        placeholder="ss"
        onChangeText={changeSecond}
        onBlur={checkSecond}
      />
      {format === '12' && (
        <TimePickerInput
          placeholder="am/pm"
          format={format}
          value={meridiem}
          onChangeText={changeMeridiem}
          onBlur={checkMeridiem}
        />
      )}
    </View>
  );
}
