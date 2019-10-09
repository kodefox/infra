import { HourFormat } from '../../helpers/timeChecker';

export type TimePickerProps = {
  readonly format?: HourFormat;
  readonly onChangeTime?: (utcString: string) => void;
};
