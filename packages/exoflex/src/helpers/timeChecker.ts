const HOUR_FORMAT_12 = /^([1][0-2]|[0][1-9])$/;
const HOUR_FORMAT_24 = /^([2][0-3]|[1][0-9]|[0][0-9])$/;
const MINUTE_FORMAT = /^([0-5][0-9])$/;
const SECOND_FORMAT = /^([0-5][0-9])$/;

export type HourFormat = '12' | '24';
export type Midnight = 'AM' | 'PM';

export function isHourFormatValid(hour: string, format: HourFormat = '12') {
  return format === '12'
    ? HOUR_FORMAT_12.test(hour)
    : HOUR_FORMAT_24.test(hour);
}

export function isMinutesFormatValid(minute: string) {
  return MINUTE_FORMAT.test(minute);
}

export function isSecondsFormatValid(second: string) {
  return SECOND_FORMAT.test(second);
}
