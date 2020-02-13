import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Provider from '../Provider';
import SegmentedControl from '../SegmentedControl/SegmentedControl';

describe('SegmentedControl', () => {
  it('should render default Segmented Control', () => {
    let { getAllByText } = render(
      <Provider>
        <SegmentedControl activeIndex={0} values={['Tab One', 'Tab Two']} />
      </Provider>,
    );
    expect(getAllByText(/\bTab/)).toHaveLength(2);
  });

  it('should execute on segment change callback', () => {
    let activeIndex = 0;
    let changeIndex = jest.fn(() => {
      activeIndex = 1;
    });

    let { getByText } = render(
      <Provider>
        <SegmentedControl
          activeIndex={activeIndex}
          values={['Tab One', 'Tab Two']}
          onIndexChange={changeIndex}
        />
      </Provider>,
    );
    fireEvent.press(getByText('Tab Two'));
    expect(changeIndex).toBeCalledTimes(1);
    expect(activeIndex).toEqual(1);
  });

  it('should handle disabled Segmented Control', () => {
    let activeIndex = 0;
    let changeIndex = jest.fn(() => {
      activeIndex = 1;
    });

    let { getByText } = render(
      <Provider>
        <SegmentedControl
          activeIndex={activeIndex}
          values={['Tab One', 'Tab Two']}
          onIndexChange={changeIndex}
          disabled={true}
        />
      </Provider>,
    );
    // NOTE: Disable this as this is still an issue (https://github.com/callstack/react-native-testing-library/issues/28)
    // fireEvent.press(getByText('Tab Two'));
    expect(getByText('Tab Two')).toBeTruthy();
    expect(changeIndex).toBeCalledTimes(0);
    expect(activeIndex).toEqual(0);
  });
});
