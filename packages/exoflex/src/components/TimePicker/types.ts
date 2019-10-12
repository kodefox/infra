import { TextStyle, StyleProp } from 'react-native';
import { HourFormat } from '../../helpers/timeChecker';

export type TimePickerProps = {
  readonly date: string;
  readonly format?: HourFormat;
  readonly nativePlaceholder?: string;
  readonly titleIOS?: string;
  readonly onChangeTime?: (utcString: string) => void;
  readonly style?: StyleProp<TextStyle>;
};
