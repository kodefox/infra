import { Midnight } from './timeChecker';

export default function convertTimeToDate(
  initialDate: string,
  hour: string,
  minute: string,
  second: string,
  midnight?: Midnight,
): string {
  let hourBasedOnMidnight = ~~hour;
  if (midnight === 'PM') {
    hourBasedOnMidnight = hourBasedOnMidnight + 12;
  }
  return new Date(
    new Date(initialDate).setHours(hourBasedOnMidnight, ~~minute, ~~second),
  ).toISOString();
}
