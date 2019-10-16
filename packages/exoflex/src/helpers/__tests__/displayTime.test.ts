import { createTimeForDisplay } from '../displayTime';

const initialDate = '2019-10-10T11:03:11.044Z';
const initialDate2 = '2019-10-10T21:03:11.044Z';
const initialDate3 = '2019-10-10T04:03:11.044Z';

describe('createTimeForDisplay', () => {
  it('should return display time in 12h format', () => {
    const hours = new Date(initialDate).getHours();
    const strHours = hours > 12 ? (hours - 12).toString() : hours.toString();
    const meridiem = ~~hours > 12 ? 'PM' : 'AM';
    const hours2 = new Date(initialDate2).getHours();
    const strHours2 =
      hours2 > 12 ? (hours2 - 12).toString() : hours2.toString();
    const meridiem2 = ~~hours2 > 12 ? 'PM' : 'AM';
    const hours3 = new Date(initialDate3).getHours();
    const strHours3 =
      hours3 > 12 ? (hours3 - 12).toString() : hours3.toString();
    const meridiem3 = ~~hours3 > 12 ? 'PM' : 'AM';

    expect(createTimeForDisplay(initialDate, '12')).toBe(
      `${strHours.padStart(2, '0')}:03:11 ${meridiem}`,
    );
    expect(createTimeForDisplay(initialDate2, '12')).toBe(
      `${strHours2.padStart(2, '0')}:03:11 ${meridiem2}`,
    );
    expect(createTimeForDisplay(initialDate3, '12')).toBe(
      `${strHours3.padStart(2, '0')}:03:11 ${meridiem3}`,
    );
  });

  it('should return display time in 24h format', () => {
    const hours = new Date(initialDate)
      .getHours()
      .toString()
      .padStart(2, '0');
    const hours2 = new Date(initialDate2)
      .getHours()
      .toString()
      .padStart(2, '0');

    expect(createTimeForDisplay(initialDate, '24')).toBe(`${hours}:03:11`);
    expect(createTimeForDisplay(initialDate2, '24')).toBe(`${hours2}:03:11`);
  });
});
