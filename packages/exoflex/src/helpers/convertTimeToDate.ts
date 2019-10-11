import { Meridiem } from './timeChecker';

export default function convertTimeToDate(
  initialDate: string,
  hour: string,
  minute: string,
  second: string,
  meridiem?: Meridiem,
): string {
  let hourBasedOnMeridiem = ~~hour;
  if (meridiem === 'PM') {
    hourBasedOnMeridiem = hourBasedOnMeridiem + 12;
  }
  return new Date(
    new Date(initialDate).setHours(hourBasedOnMeridiem, ~~minute, ~~second),
  ).toISOString();
}
