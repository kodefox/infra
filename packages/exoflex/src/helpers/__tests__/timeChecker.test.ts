import {
  checkHourFormat,
  checkMinuteFormat,
  checkSecondFormat,
} from '../timeChecker';

describe('checkHourFormat', () => {
  it('should validate 1 - 12 as true for 12h format', () => {
    expect(checkHourFormat('01')).toBeTruthy();
    expect(checkHourFormat('02')).toBeTruthy();
    expect(checkHourFormat('03')).toBeTruthy();
    expect(checkHourFormat('04')).toBeTruthy();
    expect(checkHourFormat('05')).toBeTruthy();
    expect(checkHourFormat('06')).toBeTruthy();
    expect(checkHourFormat('07')).toBeTruthy();
    expect(checkHourFormat('08')).toBeTruthy();
    expect(checkHourFormat('09')).toBeTruthy();
    expect(checkHourFormat('10')).toBeTruthy();
    expect(checkHourFormat('11')).toBeTruthy();
    expect(checkHourFormat('12')).toBeTruthy();
  });

  it('should validate 0 and 13 or more as false for 12h format', () => {
    expect(checkHourFormat('00')).toBeFalsy();
    expect(checkHourFormat('13')).toBeFalsy();
    expect(checkHourFormat('14')).toBeFalsy();
    expect(checkHourFormat('15')).toBeFalsy();
    expect(checkHourFormat('16')).toBeFalsy();
    expect(checkHourFormat('17')).toBeFalsy();
    expect(checkHourFormat('18')).toBeFalsy();
    expect(checkHourFormat('19')).toBeFalsy();
    expect(checkHourFormat('20')).toBeFalsy();
    expect(checkHourFormat('21')).toBeFalsy();
    expect(checkHourFormat('22')).toBeFalsy();
    expect(checkHourFormat('23')).toBeFalsy();
    expect(checkHourFormat('24')).toBeFalsy();
    expect(checkHourFormat('99')).toBeFalsy();
  });

  it('should validate 0 - 12 as true for 24h format', () => {
    expect(checkHourFormat('00', '24')).toBeTruthy();
    expect(checkHourFormat('01', '24')).toBeTruthy();
    expect(checkHourFormat('02', '24')).toBeTruthy();
    expect(checkHourFormat('03', '24')).toBeTruthy();
    expect(checkHourFormat('04', '24')).toBeTruthy();
    expect(checkHourFormat('05', '24')).toBeTruthy();
    expect(checkHourFormat('06', '24')).toBeTruthy();
    expect(checkHourFormat('07', '24')).toBeTruthy();
    expect(checkHourFormat('08', '24')).toBeTruthy();
    expect(checkHourFormat('09', '24')).toBeTruthy();
    expect(checkHourFormat('10', '24')).toBeTruthy();
    expect(checkHourFormat('11', '24')).toBeTruthy();
    expect(checkHourFormat('12', '24')).toBeTruthy();
  });

  it('should validate 13 - 23 as true for 24h format', () => {
    expect(checkHourFormat('13', '24')).toBeTruthy();
    expect(checkHourFormat('14', '24')).toBeTruthy();
    expect(checkHourFormat('15', '24')).toBeTruthy();
    expect(checkHourFormat('16', '24')).toBeTruthy();
    expect(checkHourFormat('17', '24')).toBeTruthy();
    expect(checkHourFormat('18', '24')).toBeTruthy();
    expect(checkHourFormat('19', '24')).toBeTruthy();
    expect(checkHourFormat('20', '24')).toBeTruthy();
    expect(checkHourFormat('21', '24')).toBeTruthy();
    expect(checkHourFormat('22', '24')).toBeTruthy();
    expect(checkHourFormat('23', '24')).toBeTruthy();
  });

  it('should validate 24 or more as false for 24h format', () => {
    expect(checkHourFormat('24', '24')).toBeFalsy();
    expect(checkHourFormat('25', '24')).toBeFalsy();
    expect(checkHourFormat('26', '24')).toBeFalsy();
    expect(checkHourFormat('27', '24')).toBeFalsy();
    expect(checkHourFormat('28', '24')).toBeFalsy();
    expect(checkHourFormat('29', '24')).toBeFalsy();
    expect(checkHourFormat('30', '24')).toBeFalsy();
    expect(checkHourFormat('31', '24')).toBeFalsy();
    expect(checkHourFormat('32', '24')).toBeFalsy();
    expect(checkHourFormat('33', '24')).toBeFalsy();
    expect(checkHourFormat('34', '24')).toBeFalsy();
    expect(checkHourFormat('35', '24')).toBeFalsy();
    expect(checkHourFormat('36', '24')).toBeFalsy();
    expect(checkHourFormat('99', '24')).toBeFalsy();
  });
});

describe('checkMinuteFormat', () => {
  it('should validate 0 - 59 as true', () => {
    expect(checkMinuteFormat('00')).toBeTruthy();
    expect(checkMinuteFormat('01')).toBeTruthy();
    expect(checkMinuteFormat('10')).toBeTruthy();
    expect(checkMinuteFormat('30')).toBeTruthy();
    expect(checkMinuteFormat('59')).toBeTruthy();
  });

  it('should validate m < 1 or m > 59 as false', () => {
    expect(checkMinuteFormat('-1')).toBeFalsy();
    expect(checkMinuteFormat('60')).toBeFalsy();
    expect(checkMinuteFormat('abc')).toBeFalsy();
    expect(checkMinuteFormat('600')).toBeFalsy();
    expect(checkMinuteFormat('61')).toBeFalsy();
  });
});

describe('checkSecondFormat', () => {
  it('should validate 0 - 59 as true', () => {
    expect(checkSecondFormat('00')).toBeTruthy();
    expect(checkSecondFormat('01')).toBeTruthy();
    expect(checkSecondFormat('10')).toBeTruthy();
    expect(checkSecondFormat('30')).toBeTruthy();
    expect(checkSecondFormat('59')).toBeTruthy();
  });

  it('should validate s < 1 or s > 59 as false', () => {
    expect(checkSecondFormat('-1')).toBeFalsy();
    expect(checkSecondFormat('60')).toBeFalsy();
    expect(checkSecondFormat('abc')).toBeFalsy();
    expect(checkSecondFormat('600')).toBeFalsy();
    expect(checkSecondFormat('61')).toBeFalsy();
  });
});
