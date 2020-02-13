import { DateTimePickerProps as RNDateTimePickerProps } from 'react-native-modal-datetime-picker';

export type DateTimePickerMode = 'date' | 'time' | 'datetime';

export type DateTimePickerProps = Readonly<
  Omit<
    RNDateTimePickerProps,
    'onCancel' | 'onConfirm' | 'date' | 'mode' | 'is24Hour'
  > & {
    title?: string;
    dateTitle?: string;
    timeTitle?: string;
    mode?: DateTimePickerMode;
    date?: string;
    use24Hour?: boolean;
    onCancel: () => void;
    onConfirm: (date: string) => void;
  }
>;
