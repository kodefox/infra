import { Meridiem, HourFormat } from './timeChecker';
import { padTime } from './displayTime';

export function convertTimeToDate(
  initialDate: string,
  hour: string,
  minute: string,
  second: string,
  meridiem?: Meridiem,
): string {
  let date = initialDate.trim() === '' ? new Date() : new Date(initialDate);
  let hourBasedOnMeridiem = ~~hour;
  if (meridiem === 'PM' && hourBasedOnMeridiem < 12) {
    hourBasedOnMeridiem = hourBasedOnMeridiem + 12;
  } else if (meridiem === 'AM' && hourBasedOnMeridiem >= 12) {
    hourBasedOnMeridiem = hourBasedOnMeridiem - 12;
  }
  return new Date(
    date.setHours(hourBasedOnMeridiem, ~~minute, ~~second),
  ).toISOString();
}

export function convertDateToLocalTime(
  date: string,
  format: HourFormat = '12',
): Array<string> {
  let is12Hour = format === '12';
  let d = new Date(date);
  let [time, meridiem] = d
    .toLocaleTimeString('en-US', {
      hour12: is12Hour,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .split(' ');
  let [hour, ...restTime] = time.split(':');
  if (is12Hour) {
    return [padTime(hour), ...restTime, meridiem];
  }
  // NOTE: Need to manually pad the hour because there is bug with `2-digit` on hour
  // https://bugs.chromium.org/p/chromium/issues/detail?id=507037
  return [padTime(hour), ...restTime];
}
