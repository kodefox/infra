import React from 'react';
import Provider from '../Provider';
import { render } from '@testing-library/react';
import * as Avatar from '../Avatar';

describe('Avatar', () => {
  it('should render all type of Avatar properly', () => {
    let { getByText, getAllByRole } = render(
      <Provider>
        <Avatar.Icon icon="home" />
        <Avatar.Image source={{ uri: 'https://picsum.photos/id/37/50' }} />
        <Avatar.Text label="EF" />
      </Provider>,
    );
    // There are two elements that using role="img"
    // 1. Icon from Avatar.Icon
    // 2. Image from Avatar.Image
    expect(getAllByRole('img').length).toBe(2);
    expect(getByText('EF')).toBeTruthy();
  });
});
