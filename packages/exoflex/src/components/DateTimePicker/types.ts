import { DateTimePickerProps as RNDateTimePickerProps } from 'react-native-modal-datetime-picker';

export type DateTimePickerMode = 'date' | 'time' | 'datetime';

export type DateTimePickerProps = Omit<
  RNDateTimePickerProps,
  'onCancel' | 'onConfirm' | 'date' | 'mode'
> & {
  readonly mode?: DateTimePickerMode;
  readonly date?: string;
  readonly onCancel: () => void;
  readonly onConfirm: (date: string) => void;
};
