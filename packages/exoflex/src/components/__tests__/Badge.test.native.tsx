import React from 'react';
import Provider from '../Provider';
import { render } from 'react-native-testing-library';
import Badge from '../Badge';

describe('Badge', () => {
  it('should render badge properly', () => {
    let { getByType, getByText, getByTestId } = render(
      <Provider>
        <Badge testID="badge">2</Badge>
      </Provider>,
    );
    expect(getByType(Badge)).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByTestId('badge')).toBeTruthy();
  });
});
