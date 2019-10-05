import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { TextInput, IconButton } from '../';

import useTheme from '../helpers/useTheme';
import {
  checkHourFormat,
  checkMinuteFormat,
  checkSecondFormat,
  HourFormat,
  Midnight,
} from '../helpers/timeChecker';

export type Props = {
  readonly format?: HourFormat;
  readonly onChangeTime?: (utcString: string) => void;
};

export default function TimePicker(props: Props) {
  let { format = '12' as HourFormat, onChangeTime } = props;

  let [hour, setHour] = useState('12');
  let [minute, setMinute] = useState('00');
  let [second, setSecond] = useState('00');
  let [midnight, setMidnight] = useState<Midnight>('am');

  useEffect(() => {
    let utcString = convertTimeToDate(hour, minute, second, midnight);
    onChangeTime && onChangeTime(utcString);
  }, [hour, minute, second, midnight]);

  let changeHour = (newHour: string) => setHour(newHour);
  let changeMinute = (newMinute: string) => setMinute(newMinute);
  let changeSecond = (newSecond: string) => setSecond(newSecond);
  let changeMidnight = (newMidnight: string) =>
    setMidnight(newMidnight as Midnight);

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
        label="Hours"
        value={hour}
        onChangeText={changeHour}
        onBlur={checkHour}
      />
      <TimePickerInput
        label="Minutes"
        value={minute}
        onChangeText={changeMinute}
        onBlur={checkMinute}
      />
      <TimePickerInput
        label="Seconds"
        value={second}
        onChangeText={changeSecond}
        onBlur={checkSecond}
      />
      {format === '12' && (
        <TimePickerInput
          label="Midnight"
          value={midnight}
          onChangeText={changeMidnight}
          onBlur={checkMidnight}
        />
      )}
    </View>
  );
}

export type TimePickerInputProps = {
  readonly label: string;
  readonly value: string;
  readonly onChangeText?: (text: string) => void;
  readonly onBlur?: (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => void | undefined;
};

export function TimePickerInput(props: TimePickerInputProps) {
  let { colors, roundness } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderRadius: roundness,
          marginLeft: props.label === 'Hours' ? 0 : 10,
        },
      ]}
    >
      <TextInput
        mode="outlined"
        maxLength={2}
        containerStyle={{ borderWidth: 0 }}
        style={{ width: 50 }}
        {...props}
      />
      <View style={[styles.arrowWrapper, { borderColor: colors.border }]}>
        <IconButton
          icon="keyboard-arrow-up"
          onPress={() => {}}
          style={styles.arrow}
        />
        <IconButton
          icon="keyboard-arrow-down"
          onPress={() => {}}
          style={styles.arrow}
        />
      </View>
    </View>
  );
}

export function convertTimeToDate(
  hour: string,
  minute: string,
  second: string,
  midnight?: Midnight,
): string {
  let hourBasedOnMidnight = ~~hour;
  if (midnight === 'pm') {
    hourBasedOnMidnight = hourBasedOnMidnight + 12;
  }
  return new Date(
    new Date().setHours(hourBasedOnMidnight, ~~minute, ~~second),
  ).toISOString();
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  arrowWrapper: {
    justifyContent: 'space-evenly',
    borderLeftWidth: 1,
  },
  arrow: {
    margin: 0,
  },
});
