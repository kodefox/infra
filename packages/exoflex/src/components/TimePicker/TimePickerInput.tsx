import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from 'react-native';
import TextInput from '../TextInput/TextInput';
import IconButton from '../IconButton';

import { HourFormat } from '../../helpers/timeChecker';
import useTheme from '../../helpers/useTheme';

export type TimePickerInputProps = {
  readonly label: 'Hrs' | 'Mins' | 'Secs' | 'Mid';
  readonly value: string;
  readonly format: HourFormat;
  readonly onChangeText?: (text: string) => void;
  readonly onBlur?: (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => void | undefined;
};

export default function TimePickerInput(props: TimePickerInputProps) {
  let { colors, roundness } = useTheme();
  let { format, ...otherProps } = props;

  let toggleMidnight = () => {
    let { value, onChangeText } = otherProps;
    onChangeText && onChangeText(value === 'am' ? 'pm' : 'am');
  };

  let pressUp = useCallback(() => {
    let { label, value, onChangeText } = otherProps;
    if (label === 'Mid') {
      toggleMidnight();
      return;
    }
    let newValue = ~~value + 1;
    switch (label) {
      case 'Hrs':
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
    if (label === 'Mid') {
      toggleMidnight();
      return;
    }
    let newValue = ~~value - 1;
    switch (label) {
      case 'Hrs':
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
          marginLeft: otherProps.label === 'Hrs' ? 0 : 10,
        },
      ]}
    >
      <TextInput
        mode="outlined"
        maxLength={2}
        containerStyle={{ borderWidth: 0 }}
        style={{ width: 20 }}
        // NOTE: We are using `phone-pad` because either `numeric`, `number-pad`, or `decimal-pad`
        // is changing the TextInput into <input type="number" />
        keyboardType={otherProps.label === 'Mid' ? 'default' : 'phone-pad'}
        value={otherProps.value}
        {...otherProps}
      />
      <TimePickerArrow
        label={otherProps.label}
        onPressUp={pressUp}
        onPressDown={pressDown}
      />
    </View>
  );
}

export type TimePickerArrowProps = {
  readonly label?: string;
  readonly onPressUp: () => void;
  readonly onPressDown: () => void;
};

function TimePickerArrow(props: TimePickerArrowProps) {
  let { colors } = useTheme();
  let { onPressUp, onPressDown, label } = props;

  return (
    <View style={[styles.arrowWrapper, { borderColor: colors.border }]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressUp}
        data-testid={`arrowUp${label}`}
      >
        <MemoizedArrowUp />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressDown}
        data-testid={`arrowDown${label}`}
      >
        <MemoizedArrowDown />
      </TouchableOpacity>
    </View>
  );
}

function ArrowUp() {
  return <IconButton icon="keyboard-arrow-up" style={styles.arrow} />;
}
function ArrowDown() {
  return <IconButton icon="keyboard-arrow-down" style={styles.arrow} />;
}

// NOTE: React.memo needed to boost performance on mobile web
const MemoizedArrowUp = React.memo(ArrowUp);
const MemoizedArrowDown = React.memo(ArrowDown);

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
