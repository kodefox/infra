import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '../ToastContainer';

describe('ToastContainer', () => {
  it('should render ToastContainer properly', () => {
    let App = () => <ToastContainer />;

    expect(render(<App />)).toBeTruthy();
  });
});
