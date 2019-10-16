import { HourFormat, Meridiem } from './timeChecker';

export function createTimeForDisplay(initialDate: string, format: HourFormat) {
  let d = new Date(initialDate);
  let hour = d
    .getHours()
    .toString()
    .padStart(2, '0');
  let mins = d
    .getMinutes()
    .toString()
    .padStart(2, '0');
  let secs = d
    .getSeconds()
    .toString()
    .padStart(2, '0');
  if (format === '12') {
    let iHour = ~~hour;
    let newHour = hour;
    let meridiem: Meridiem = 'AM';
    if (iHour > 12) {
      iHour = iHour - 12;
      meridiem = 'PM';
      newHour = iHour.toString().padStart(2, '0');
    }
    return `${newHour}:${mins}:${secs} ${meridiem}`;
  }
  return `${hour}:${mins}:${secs}`;
}
