import React from 'react';
import Provider from '../Provider';
import { render, fireEvent } from '@testing-library/react';
import '../../../test/customFireEvent.web';
import Button from '../Button';
import Text from '../Text';

describe('Button', () => {
  it('should render normally', () => {
    let { getByText, getByTestId } = render(
      <Provider>
        <Button testID="defaultButton" preset="primary">
          This is primary button
        </Button>
        <Button preset="secondary">This is secondary button</Button>
        <Button testID="rippleButton" useRipple preset="primary">
          Primary ripple
        </Button>
        <Button useRipple preset="secondary">
          Secondary ripple
        </Button>
      </Provider>,
    );
    expect(getByText('This is primary button')).toBeTruthy();
    expect(getByText('This is secondary button')).toBeTruthy();
    expect(getByText('Primary ripple')).toBeTruthy();
    expect(getByText('Secondary ripple')).toBeTruthy();
    expect(getByTestId('defaultButton')).toBeTruthy();
    expect(getByTestId('rippleButton')).toBeTruthy();
  });

  it('should render normally with icon', () => {
    let { getByText } = render(
      <Provider>
        <Button preset="primary" icon="home">
          This is primary button with icon
        </Button>
        <Button useRipple preset="primary" icon="home">
          Primary ripple with icon
        </Button>
      </Provider>,
    );
    expect(getByText('This is primary button with icon')).toBeTruthy();
    expect(getByText('Primary ripple with icon')).toBeTruthy();
  });

  it('should run onPress', () => {
    let mockPress = jest.fn();
    let { getByText, getByTestId } = render(
      <Provider>
        <Button
          testID="button"
          preset="invisible"
          color="red"
          onPress={mockPress}
        >
          Press me!
        </Button>
      </Provider>,
    );
    fireEvent(
      getByText('Press me!'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockPress).toBeCalledTimes(1);

    fireEvent(
      getByTestId('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockPress).toBeCalledTimes(2);
  });

  it('should render disabled', () => {
    let mockPress = jest.fn();
    let { getByText } = render(
      <Provider>
        <Button disabled preset="primary" onPress={mockPress}>
          Press me!
        </Button>
        <Button disabled useRipple preset="primary" onPress={mockPress}>
          <Text>Ripple me!</Text>
        </Button>
      </Provider>,
    );
    let element = getByText('Press me!');
    let elementRipple = getByText('Ripple me!');
    fireEvent.click(element);
    fireEvent.click(elementRipple);
    expect(element).toBeTruthy();
    expect(elementRipple).toBeTruthy();
    expect(mockPress).toBeCalledTimes(0);
  });
});
