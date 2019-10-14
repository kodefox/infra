import React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from '../Calendar';

const warningSpy = jest
  .spyOn(console, 'warn')
  .mockImplementation((message: string) => {
    let blacklistedMessage =
      'Warning: componentWillReceiveProps has been renamed';
    return message.startsWith(blacklistedMessage) ? '' : message;
  });

describe('Calendar', () => {
  afterAll(() => {
    warningSpy.mockClear();
  });

  it('should render normally', () => {
    let { getByText } = render(<Calendar />);
    expect(getByText('Sun')).toBeTruthy();
    expect(getByText('Mon')).toBeTruthy();
    expect(getByText('Tue')).toBeTruthy();
    expect(getByText('Wed')).toBeTruthy();
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('Fri')).toBeTruthy();
    expect(getByText('Sat')).toBeTruthy();
  });

  it('should render with custom text preset', () => {
    let { getByText } = render(<Calendar textPreset="rubik" />);
    expect(getByText('Sun')).toBeTruthy();
    expect(getByText('Mon')).toBeTruthy();
    expect(getByText('Tue')).toBeTruthy();
    expect(getByText('Wed')).toBeTruthy();
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('Fri')).toBeTruthy();
    expect(getByText('Sat')).toBeTruthy();
  });
});
