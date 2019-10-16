import {
  isHoursFormatValid,
  isMinutesFormatValid,
  isSecondsFormatValid,
} from '../timeChecker';

describe('isHoursFormatValid', () => {
  it('should validate 1 - 12 as true for 12h format', () => {
    expect(isHoursFormatValid('01')).toBeTruthy();
    expect(isHoursFormatValid('02')).toBeTruthy();
    expect(isHoursFormatValid('03')).toBeTruthy();
    expect(isHoursFormatValid('04')).toBeTruthy();
    expect(isHoursFormatValid('05')).toBeTruthy();
    expect(isHoursFormatValid('06')).toBeTruthy();
    expect(isHoursFormatValid('07')).toBeTruthy();
    expect(isHoursFormatValid('08')).toBeTruthy();
    expect(isHoursFormatValid('09')).toBeTruthy();
    expect(isHoursFormatValid('10')).toBeTruthy();
    expect(isHoursFormatValid('11')).toBeTruthy();
    expect(isHoursFormatValid('12')).toBeTruthy();
  });

  it('should validate 0 and 13 or more as false for 12h format', () => {
    expect(isHoursFormatValid('00')).toBeFalsy();
    expect(isHoursFormatValid('13')).toBeFalsy();
    expect(isHoursFormatValid('14')).toBeFalsy();
    expect(isHoursFormatValid('15')).toBeFalsy();
    expect(isHoursFormatValid('16')).toBeFalsy();
    expect(isHoursFormatValid('17')).toBeFalsy();
    expect(isHoursFormatValid('18')).toBeFalsy();
    expect(isHoursFormatValid('19')).toBeFalsy();
    expect(isHoursFormatValid('20')).toBeFalsy();
    expect(isHoursFormatValid('21')).toBeFalsy();
    expect(isHoursFormatValid('22')).toBeFalsy();
    expect(isHoursFormatValid('23')).toBeFalsy();
    expect(isHoursFormatValid('24')).toBeFalsy();
    expect(isHoursFormatValid('99')).toBeFalsy();
  });

  it('should validate 0 - 12 as true for 24h format', () => {
    expect(isHoursFormatValid('00', '24')).toBeTruthy();
    expect(isHoursFormatValid('01', '24')).toBeTruthy();
    expect(isHoursFormatValid('02', '24')).toBeTruthy();
    expect(isHoursFormatValid('03', '24')).toBeTruthy();
    expect(isHoursFormatValid('04', '24')).toBeTruthy();
    expect(isHoursFormatValid('05', '24')).toBeTruthy();
    expect(isHoursFormatValid('06', '24')).toBeTruthy();
    expect(isHoursFormatValid('07', '24')).toBeTruthy();
    expect(isHoursFormatValid('08', '24')).toBeTruthy();
    expect(isHoursFormatValid('09', '24')).toBeTruthy();
    expect(isHoursFormatValid('10', '24')).toBeTruthy();
    expect(isHoursFormatValid('11', '24')).toBeTruthy();
    expect(isHoursFormatValid('12', '24')).toBeTruthy();
  });

  it('should validate 13 - 23 as true for 24h format', () => {
    expect(isHoursFormatValid('13', '24')).toBeTruthy();
    expect(isHoursFormatValid('14', '24')).toBeTruthy();
    expect(isHoursFormatValid('15', '24')).toBeTruthy();
    expect(isHoursFormatValid('16', '24')).toBeTruthy();
    expect(isHoursFormatValid('17', '24')).toBeTruthy();
    expect(isHoursFormatValid('18', '24')).toBeTruthy();
    expect(isHoursFormatValid('19', '24')).toBeTruthy();
    expect(isHoursFormatValid('20', '24')).toBeTruthy();
    expect(isHoursFormatValid('21', '24')).toBeTruthy();
    expect(isHoursFormatValid('22', '24')).toBeTruthy();
    expect(isHoursFormatValid('23', '24')).toBeTruthy();
  });

  it('should validate 24 or more as false for 24h format', () => {
    expect(isHoursFormatValid('24', '24')).toBeFalsy();
    expect(isHoursFormatValid('25', '24')).toBeFalsy();
    expect(isHoursFormatValid('26', '24')).toBeFalsy();
    expect(isHoursFormatValid('27', '24')).toBeFalsy();
    expect(isHoursFormatValid('28', '24')).toBeFalsy();
    expect(isHoursFormatValid('29', '24')).toBeFalsy();
    expect(isHoursFormatValid('30', '24')).toBeFalsy();
    expect(isHoursFormatValid('31', '24')).toBeFalsy();
    expect(isHoursFormatValid('32', '24')).toBeFalsy();
    expect(isHoursFormatValid('33', '24')).toBeFalsy();
    expect(isHoursFormatValid('34', '24')).toBeFalsy();
    expect(isHoursFormatValid('35', '24')).toBeFalsy();
    expect(isHoursFormatValid('36', '24')).toBeFalsy();
    expect(isHoursFormatValid('99', '24')).toBeFalsy();
  });
});

describe('isMinutesFormatValid', () => {
  it('should validate 0 - 59 as true', () => {
    expect(isMinutesFormatValid('00')).toBeTruthy();
    expect(isMinutesFormatValid('01')).toBeTruthy();
    expect(isMinutesFormatValid('10')).toBeTruthy();
    expect(isMinutesFormatValid('30')).toBeTruthy();
    expect(isMinutesFormatValid('59')).toBeTruthy();
  });

  it('should validate m < 1 or m > 59 as false', () => {
    expect(isMinutesFormatValid('-1')).toBeFalsy();
    expect(isMinutesFormatValid('60')).toBeFalsy();
    expect(isMinutesFormatValid('abc')).toBeFalsy();
    expect(isMinutesFormatValid('600')).toBeFalsy();
    expect(isMinutesFormatValid('61')).toBeFalsy();
  });
});

describe('isSecondsFormatValid', () => {
  it('should validate 0 - 59 as true', () => {
    expect(isSecondsFormatValid('00')).toBeTruthy();
    expect(isSecondsFormatValid('01')).toBeTruthy();
    expect(isSecondsFormatValid('10')).toBeTruthy();
    expect(isSecondsFormatValid('30')).toBeTruthy();
    expect(isSecondsFormatValid('59')).toBeTruthy();
  });

  it('should validate s < 1 or s > 59 as false', () => {
    expect(isSecondsFormatValid('-1')).toBeFalsy();
    expect(isSecondsFormatValid('60')).toBeFalsy();
    expect(isSecondsFormatValid('abc')).toBeFalsy();
    expect(isSecondsFormatValid('600')).toBeFalsy();
    expect(isSecondsFormatValid('61')).toBeFalsy();
  });
});
