import { convertTimeToDate } from '../TimePicker';

describe('convertTimeToDate', () => {
  it('should return valid date from 24h format', () => {
    expect(convertTimeToDate('12', '00', '00').split('.')[0]).toBe(
      new Date(new Date().setHours(12, 0, 0)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate('01', '00', '00').split('.')[0]).toBe(
      new Date(new Date().setHours(1, 0, 0)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate('23', '59', '01').split('.')[0]).toBe(
      new Date(new Date().setHours(23, 59, 1)).toISOString().split('.')[0],
    );
  });

  it('should return valid date from 12h format', () => {
    expect(convertTimeToDate('11', '59', '01', 'pm').split('.')[0]).toBe(
      new Date(new Date().setHours(23, 59, 1)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate('11', '59', '01', 'am').split('.')[0]).toBe(
      new Date(new Date().setHours(11, 59, 1)).toISOString().split('.')[0],
    );
  });
});
