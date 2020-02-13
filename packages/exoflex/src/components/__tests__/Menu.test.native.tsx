import React, { useState } from 'react';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';

import Provider from '../Provider';
import Menu from '../Menu';
import Text from '../Text';
import Button from '../Button';

describe('Menu.Item', () => {
  it('should render properly', () => {
    let { getByText } = render(
      <Provider>
        <Menu.Item title="Item 1" />
      </Provider>,
    );
    expect(getByText('Item 1')).toBeTruthy();
  });

  it('should render properly with custom title', () => {
    let { getByText } = render(
      <Provider>
        <Menu.Item title={<Text>Custom Item</Text>} />
      </Provider>,
    );
    expect(getByText('Custom Item')).toBeTruthy();
  });
});

describe('Menu', () => {
  it('should render properly', async () => {
    const App = () => {
      let [visible, setVisible] = useState(false);
      return (
        <Provider>
          <Menu
            visible={visible}
            onDismiss={jest.fn()}
            anchor={<Button onPress={() => setVisible(true)}>Show menu</Button>}
          >
            <Menu.Item title="Item 1" />
          </Menu>
        </Provider>
      );
    };

    let { getByText } = render(<App />);

    act(() => {
      fireEvent.press(getByText('Show menu'));
    });
    await waitForElement(() => getByText('Item 1'));

    expect(getByText('Item 1')).toBeTruthy();
  });
});
