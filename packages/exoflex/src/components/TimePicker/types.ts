import { TextStyle, StyleProp } from 'react-native';
import { HourFormat } from '../../helpers/timeChecker';

export type TimePickerProps = Readonly<{
  date: string;
  format?: HourFormat;
  placeholder?: string;
  titleIOS?: string;
  onChangeTime?: (utcString: string) => void;
  style?: StyleProp<TextStyle>;
}>;
