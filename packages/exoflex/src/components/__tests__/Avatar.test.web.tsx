import React from 'react';
import Provider from '../Provider';
import { render } from '@testing-library/react';
import * as Avatar from '../Avatar';

describe('Avatar', () => {
  it('should render all type of Avatar properly', () => {
    let { getByText, getAllByRole, getByTestId } = render(
      <Provider>
        <Avatar.Icon icon="home" />
        <Avatar.Image source={{ uri: 'https://picsum.photos/id/37/50' }} />
        <Avatar.Text label="EF" />
      </Provider>,
    );
    // On latest react-native-paper, there's a check if the source for the icon is Image or not. So rendered
    // Avatar.Icon with prop `icon` element will not have role img
    // Ref: https://github.com/callstack/react-native-paper/blob/main/src/components/Icon.tsx
    expect(getByTestId('avatarIcon')).toBeTruthy(); // Probably need more robust solution for this
    expect(getAllByRole('img').length).toBe(1);
    expect(getByText('EF')).toBeTruthy();
  });
});
