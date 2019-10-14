import React, { ComponentType } from 'react';
import { render } from 'react-native-testing-library';

import ToastContainer from '../ToastContainer';
import Toast from '../Toast';

describe('ToastContainer', () => {
  it('should render ToastContainer properly', () => {
    let App = () => <ToastContainer />;

    let { getAllByType } = render(<App />);

    expect(getAllByType(Toast as ComponentType<Toast>).length).toBe(1);
  });
});
