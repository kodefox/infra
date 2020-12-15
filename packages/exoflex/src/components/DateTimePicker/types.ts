import { DateTimePickerProps as RNDateTimePickerProps } from 'react-native-modal-datetime-picker';
import { IOSNativeProps } from '@react-native-community/datetimepicker';

export type DateTimePickerMode = 'date' | 'time' | 'datetime';

export type DateTimePickerProps = Readonly<
  Omit<
    RNDateTimePickerProps,
    'onCancel' | 'onConfirm' | 'date' | 'mode' | 'is24Hour' | 'minuteInterval'
  > & {
    title?: string;
    dateTitleWeb?: string;
    timeTitleWeb?: string;
    cancelTextWeb?: string;
    confirmTextWeb?: string;
    mode?: DateTimePickerMode;
    date?: string;
    use24Hour?: boolean;
    onCancel: () => void;
    onConfirm: (date: string) => void;
    /**
     * Upstream issues: mismatched typing for minuteInterval
     * Props from `@react-native-community/datetimepicker` accept enum
     * while `react-native-modal-datetime-picker` use plain number.
     */
    minuteInterval?: IOSNativeProps['minuteInterval'];
  }
>;
