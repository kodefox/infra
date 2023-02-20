import React, { useState } from 'react';
import Provider from '../Provider';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '../../../test/customFireEvent.web';
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
      fireEvent(
        getByText('Show menu'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(() => getByText('Item 1'));

    expect(getByText('Item 1')).toBeTruthy();
  });
});
