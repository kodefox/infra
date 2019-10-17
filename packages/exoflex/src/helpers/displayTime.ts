import { HourFormat, Meridiem } from './timeChecker';

export function padTime(value: number | string) {
  return value.toString().padStart(2, '0');
}

export function createTimeForDisplay(initialDate: string, format: HourFormat) {
  let d = new Date(initialDate);
  let hour = padTime(d.getHours());
  let mins = padTime(d.getMinutes());
  let secs = padTime(d.getSeconds());
  if (format === '12') {
    let iHour = ~~hour;
    let newHour = hour;
    let meridiem: Meridiem = 'AM';
    if (iHour > 12) {
      iHour = iHour - 12;
      meridiem = 'PM';
      newHour = padTime(iHour);
    }
    return `${newHour}:${mins}:${secs} ${meridiem}`;
  }
  return `${hour}:${mins}:${secs}`;
}
