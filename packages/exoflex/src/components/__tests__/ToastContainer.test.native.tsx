import React, { ComponentType, ComponentProps } from 'react';
import { render } from 'react-native-testing-library';

import ToastContainer from '../ToastContainer';
import Toast from '../Toast';

describe('ToastContainer', () => {
  it('should render ToastContainer properly', () => {
    let App = () => <ToastContainer />;

    let { getAllByType } = render(<App />);

    expect(
      getAllByType(Toast as ComponentType<ComponentProps<typeof Toast>>).length,
    ).toBe(1);
  });
});
