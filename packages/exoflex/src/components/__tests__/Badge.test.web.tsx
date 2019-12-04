import React from 'react';
import Provider from '../Provider';
import { render } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  it('should render badge properly', () => {
    let { getByText } = render(
      <Provider>
        <Badge>2</Badge>
      </Provider>,
    );
    expect(getByText('2')).toBeTruthy();
  });
});
