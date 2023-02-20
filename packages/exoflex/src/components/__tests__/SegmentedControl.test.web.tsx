import React from 'react';
import Provider from '../Provider';
import { render, fireEvent } from '@testing-library/react';
import SegmentedControl from '../SegmentedControl/SegmentedControl';
import '../../../test/customFireEvent.web';

describe('SegmentedControl', () => {
  it('should render default Segmented Control', () => {
    let activeIndex = 0;
    let changeIndex = jest.fn(() => {
      activeIndex = 1;
    });
    let { getAllByText } = render(
      <Provider>
        <SegmentedControl
          activeIndex={activeIndex}
          values={['Tab One', 'Tab Two']}
          onIndexChange={changeIndex}
        />
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

    fireEvent(
      getByText('Tab Two'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
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
    fireEvent(
      getByText('Tab Two'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(getByText('Tab Two')).toBeTruthy();
    expect(changeIndex).toBeCalledTimes(0);
    expect(activeIndex).toEqual(0);
  });
});
