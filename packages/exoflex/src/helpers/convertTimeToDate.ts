import { Meridiem } from './timeChecker';

export default function convertTimeToDate(
  initialDate: string,
  hour: string,
  minute: string,
  second: string,
  meridiem?: Meridiem,
): string {
  let date = initialDate.trim() === '' ? new Date() : new Date(initialDate);
  let hourBasedOnMeridiem = ~~hour;
  if (meridiem === 'PM') {
    hourBasedOnMeridiem = hourBasedOnMeridiem + 12;
  }
  return new Date(
    date.setHours(hourBasedOnMeridiem, ~~minute, ~~second),
  ).toISOString();
}
