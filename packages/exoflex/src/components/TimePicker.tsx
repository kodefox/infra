import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import TextInput from './TextInput/TextInput';
import IconButton from './IconButton';

import useTheme from '../helpers/useTheme';
import {
  checkHourFormat,
  checkMinuteFormat,
  checkSecondFormat,
  HourFormat,
  Midnight,
} from '../helpers/timeChecker';

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
        format={format}
        label="Hours"
        value={hour}
        onChangeText={changeHour}
        onBlur={checkHour}
      />
      <TimePickerInput
        format={format}
        label="Minutes"
        value={minute}
        onChangeText={changeMinute}
        onBlur={checkMinute}
      />
      <TimePickerInput
        format={format}
        label="Seconds"
        value={second}
        onChangeText={changeSecond}
        onBlur={checkSecond}
      />
      {format === '12' && (
        <TimePickerInput
          format={format}
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
  readonly label: 'Hours' | 'Minutes' | 'Seconds' | 'Midnight';
  readonly value: string;
  readonly format: HourFormat;
  readonly onChangeText?: (text: string) => void;
  readonly onBlur?: (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => void | undefined;
};

export function TimePickerInput(props: TimePickerInputProps) {
  let { colors, roundness } = useTheme();
  let { format, ...otherProps } = props;

  let toggleMidnight = () => {
    let { value, onChangeText } = otherProps;
    onChangeText && onChangeText(value === 'am' ? 'pm' : 'am');
  };

  let pressUp = useCallback(() => {
    let { label, value, onChangeText } = otherProps;
    if (label === 'Midnight') {
      toggleMidnight();
      return;
    }
    let newValue = ~~value + 1;
    switch (label) {
      case 'Hours':
        if (format === '12' && newValue > 12) {
          newValue = newValue - 12;
        } else if (format === '24' && newValue > 23) {
          newValue = newValue - 24;
        }
        break;
      // NOTE: For `minutes` and `seconds`
      default:
        if (newValue > 59) {
          newValue = newValue - 60;
        }
        break;
    }
    onChangeText && onChangeText(newValue.toString().padStart(2, '0'));
  }, [otherProps.value]);

  let pressDown = useCallback(() => {
    let { label, value, onChangeText } = otherProps;
    if (label === 'Midnight') {
      toggleMidnight();
      return;
    }
    let newValue = ~~value - 1;
    switch (label) {
      case 'Hours':
        if (format === '12' && newValue < 1) {
          newValue = newValue + 12;
        } else if (format === '24' && newValue < 0) {
          newValue = newValue + 24;
        }
        break;
      // NOTE: For `minutes` and `seconds`
      default:
        if (newValue < 0) {
          newValue = newValue + 60;
        }
        break;
    }
    onChangeText && onChangeText(newValue.toString().padStart(2, '0'));
  }, [otherProps.value]);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderRadius: roundness,
          marginLeft: otherProps.label === 'Hours' ? 0 : 10,
        },
      ]}
    >
      <TextInput
        mode="outlined"
        maxLength={2}
        containerStyle={{ borderWidth: 0 }}
        style={{ width: 50 }}
        {...otherProps}
      />
      <View style={[styles.arrowWrapper, { borderColor: colors.border }]}>
        <IconButton
          icon="keyboard-arrow-up"
          onPress={pressUp}
          style={styles.arrow}
          testID={`arrowUp${otherProps.label}`}
          data-testid={`arrowUp${otherProps.label}`}
        />
        <IconButton
          icon="keyboard-arrow-down"
          onPress={pressDown}
          style={styles.arrow}
          testID={`arrowDown${otherProps.label}`}
          data-testid={`arrowDown${otherProps.label}`}
        />
      </View>
    </View>
  );
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
