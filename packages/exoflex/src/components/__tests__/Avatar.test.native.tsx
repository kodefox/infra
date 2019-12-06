import React from 'react';
import Provider from '../Provider';
import { render } from 'react-native-testing-library';
import * as Avatar from '../Avatar';

describe('Avatar', () => {
  it('should render all type of Avatar properly', () => {
    let { getAllByType } = render(
      <Provider>
        <Avatar.Icon icon="home" />
        <Avatar.Image source={{ uri: 'https://picsum.photos/id/37/50' }} />
        <Avatar.Text label="EF" />
      </Provider>,
    );
    expect(getAllByType(Avatar.Icon)).toBeTruthy();
    expect(getAllByType(Avatar.Image)).toBeTruthy();
    expect(getAllByType(Avatar.Text)).toBeTruthy();
  });
});
