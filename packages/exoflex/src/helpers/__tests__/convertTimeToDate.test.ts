import convertTimeToDate from '../convertTimeToDate';

const date = new Date('2019-10-10T11:03:11.044Z');
const initialDate = date.toISOString();

describe('convertTimeToDate', () => {
  it('should return valid date from 24h format', () => {
    expect(convertTimeToDate(initialDate, '12', '00', '00').split('.')[0]).toBe(
      new Date(date.setHours(12, 0, 0)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate(initialDate, '01', '00', '00').split('.')[0]).toBe(
      new Date(date.setHours(1, 0, 0)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate(initialDate, '23', '59', '01').split('.')[0]).toBe(
      new Date(date.setHours(23, 59, 1)).toISOString().split('.')[0],
    );
    expect(convertTimeToDate(initialDate, '12', '00', '00').split('T')[0]).toBe(
      new Date(date.setHours(12, 0, 0)).toISOString().split('T')[0],
    );
    expect(convertTimeToDate(initialDate, '01', '00', '00').split('T')[0]).toBe(
      new Date(date.setHours(1, 0, 0)).toISOString().split('T')[0],
    );
    expect(convertTimeToDate(initialDate, '23', '59', '01').split('T')[0]).toBe(
      new Date(date.setHours(23, 59, 1)).toISOString().split('T')[0],
    );
  });

  it('should return valid date from 12h format', () => {
    expect(
      convertTimeToDate(initialDate, '11', '59', '01', 'PM').split('.')[0],
    ).toBe(new Date(date.setHours(23, 59, 1)).toISOString().split('.')[0]);
    expect(
      convertTimeToDate(initialDate, '11', '59', '01', 'AM').split('.')[0],
    ).toBe(new Date(date.setHours(11, 59, 1)).toISOString().split('.')[0]);
    expect(
      convertTimeToDate(initialDate, '11', '59', '01', 'PM').split('T')[0],
    ).toBe(new Date(date.setHours(23, 59, 1)).toISOString().split('T')[0]);
    expect(
      convertTimeToDate(initialDate, '11', '59', '01', 'AM').split('T')[0],
    ).toBe(new Date(date.setHours(11, 59, 1)).toISOString().split('T')[0]);
  });
});
