import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '../ToastContainer';

const warningSpy = jest
  .spyOn(console, 'warn')
  .mockImplementation((message: string) => {
    let blacklistedMessage =
      'Warning: componentWillReceiveProps has been renamed';
    return message.startsWith(blacklistedMessage) ? '' : message;
  });

describe('ToastContainer', () => {
  afterAll(() => {
    warningSpy.mockClear();
  });

  it('should render ToastContainer properly', () => {
    let App = () => <ToastContainer />;

    expect(render(<App />)).toBeTruthy();
  });
});
