import {
  isHourFormatValid,
  isMinutesFormatValid,
  isSecondsFormatValid,
} from '../timeChecker';

describe('isHourFormatValid', () => {
  it('should validate 1 - 12 as true for 12h format', () => {
    expect(isHourFormatValid('01')).toBeTruthy();
    expect(isHourFormatValid('02')).toBeTruthy();
    expect(isHourFormatValid('03')).toBeTruthy();
    expect(isHourFormatValid('04')).toBeTruthy();
    expect(isHourFormatValid('05')).toBeTruthy();
    expect(isHourFormatValid('06')).toBeTruthy();
    expect(isHourFormatValid('07')).toBeTruthy();
    expect(isHourFormatValid('08')).toBeTruthy();
    expect(isHourFormatValid('09')).toBeTruthy();
    expect(isHourFormatValid('10')).toBeTruthy();
    expect(isHourFormatValid('11')).toBeTruthy();
    expect(isHourFormatValid('12')).toBeTruthy();
  });

  it('should validate 0 and 13 or more as false for 12h format', () => {
    expect(isHourFormatValid('00')).toBeFalsy();
    expect(isHourFormatValid('13')).toBeFalsy();
    expect(isHourFormatValid('14')).toBeFalsy();
    expect(isHourFormatValid('15')).toBeFalsy();
    expect(isHourFormatValid('16')).toBeFalsy();
    expect(isHourFormatValid('17')).toBeFalsy();
    expect(isHourFormatValid('18')).toBeFalsy();
    expect(isHourFormatValid('19')).toBeFalsy();
    expect(isHourFormatValid('20')).toBeFalsy();
    expect(isHourFormatValid('21')).toBeFalsy();
    expect(isHourFormatValid('22')).toBeFalsy();
    expect(isHourFormatValid('23')).toBeFalsy();
    expect(isHourFormatValid('24')).toBeFalsy();
    expect(isHourFormatValid('99')).toBeFalsy();
  });

  it('should validate 0 - 12 as true for 24h format', () => {
    expect(isHourFormatValid('00', '24')).toBeTruthy();
    expect(isHourFormatValid('01', '24')).toBeTruthy();
    expect(isHourFormatValid('02', '24')).toBeTruthy();
    expect(isHourFormatValid('03', '24')).toBeTruthy();
    expect(isHourFormatValid('04', '24')).toBeTruthy();
    expect(isHourFormatValid('05', '24')).toBeTruthy();
    expect(isHourFormatValid('06', '24')).toBeTruthy();
    expect(isHourFormatValid('07', '24')).toBeTruthy();
    expect(isHourFormatValid('08', '24')).toBeTruthy();
    expect(isHourFormatValid('09', '24')).toBeTruthy();
    expect(isHourFormatValid('10', '24')).toBeTruthy();
    expect(isHourFormatValid('11', '24')).toBeTruthy();
    expect(isHourFormatValid('12', '24')).toBeTruthy();
  });

  it('should validate 13 - 23 as true for 24h format', () => {
    expect(isHourFormatValid('13', '24')).toBeTruthy();
    expect(isHourFormatValid('14', '24')).toBeTruthy();
    expect(isHourFormatValid('15', '24')).toBeTruthy();
    expect(isHourFormatValid('16', '24')).toBeTruthy();
    expect(isHourFormatValid('17', '24')).toBeTruthy();
    expect(isHourFormatValid('18', '24')).toBeTruthy();
    expect(isHourFormatValid('19', '24')).toBeTruthy();
    expect(isHourFormatValid('20', '24')).toBeTruthy();
    expect(isHourFormatValid('21', '24')).toBeTruthy();
    expect(isHourFormatValid('22', '24')).toBeTruthy();
    expect(isHourFormatValid('23', '24')).toBeTruthy();
  });

  it('should validate 24 or more as false for 24h format', () => {
    expect(isHourFormatValid('24', '24')).toBeFalsy();
    expect(isHourFormatValid('25', '24')).toBeFalsy();
    expect(isHourFormatValid('26', '24')).toBeFalsy();
    expect(isHourFormatValid('27', '24')).toBeFalsy();
    expect(isHourFormatValid('28', '24')).toBeFalsy();
    expect(isHourFormatValid('29', '24')).toBeFalsy();
    expect(isHourFormatValid('30', '24')).toBeFalsy();
    expect(isHourFormatValid('31', '24')).toBeFalsy();
    expect(isHourFormatValid('32', '24')).toBeFalsy();
    expect(isHourFormatValid('33', '24')).toBeFalsy();
    expect(isHourFormatValid('34', '24')).toBeFalsy();
    expect(isHourFormatValid('35', '24')).toBeFalsy();
    expect(isHourFormatValid('36', '24')).toBeFalsy();
    expect(isHourFormatValid('99', '24')).toBeFalsy();
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
