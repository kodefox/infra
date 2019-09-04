import React, { ComponentType } from 'react';
import { render } from 'react-native-testing-library';
import { withPlatform } from 'jest-with-platform';
import { render as renderWeb } from '@testing-library/react';

import ToastContainer from '../ToastContainer';
import Toast from '../Toast';

describe('ToastContainer', () => {
  it('should render ToastContainer properly', () => {
    let App = () => <ToastContainer />;

    let { getAllByType } = render(<App />);

    expect(getAllByType(Toast as ComponentType<Toast>).length).toBe(1);

    withPlatform('web', () => {
      expect(renderWeb(<App />)).toBeTruthy();
    });
  });
});
