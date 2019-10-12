import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-native-paper';
import {
  render as renderWeb,
  fireEvent as fireEventWeb,
} from '@testing-library/react';
import { render, fireEvent } from 'react-native-testing-library';
import Button from '../Button';

const BasicButton = () => (
  <Provider>
    <Button preset="primary">This is primary button</Button>
    <Button preset="secondary">This is secondary button</Button>
  </Provider>
);

const BasicButtonWithIcon = () => (
  <Provider>
    <Button preset="primary" icon="home">
      This is primary button with icon
    </Button>
  </Provider>
);

const ClickableButton = (props: {
  onPress: jest.Mock<unknown, Array<unknown>>;
}) => (
  <Provider>
    <Button preset="primary" onPress={props.onPress}>
      Press me!
    </Button>
  </Provider>
);

const DisabledButton = (props: {
  onPress: jest.Mock<unknown, Array<unknown>>;
}) => (
  <Provider>
    <Button disabled preset="primary" onPress={props.onPress}>
      Press me!
    </Button>
  </Provider>
);

describe('Button', () => {
  it('should render normally', () => {
    let { getByText } =
      Platform.OS === 'web'
        ? renderWeb(<BasicButton />)
        : render(<BasicButton />);
    expect(getByText('THIS IS PRIMARY BUTTON')).toBeTruthy();
    expect(getByText('THIS IS SECONDARY BUTTON')).toBeTruthy();
  });

  it('should render normally with icon', () => {
    let { getByText } =
      Platform.OS === 'web'
        ? renderWeb(<BasicButtonWithIcon />)
        : render(<BasicButtonWithIcon />);
    expect(getByText('THIS IS PRIMARY BUTTON WITH ICON')).toBeTruthy();
  });

  it('should run onPress', () => {
    let mockedOnPress = jest.fn();
    if (Platform.OS === 'web') {
      let { getByText } = renderWeb(
        <ClickableButton onPress={mockedOnPress} />,
      );
      let element = getByText('PRESS ME!');
      fireEventWeb.mouseDown(element);
      fireEventWeb.mouseUp(element);
    } else {
      let { getByText } = render(<ClickableButton onPress={mockedOnPress} />);
      fireEvent.press(getByText('PRESS ME!'));
    }
    expect(mockedOnPress).toBeCalledTimes(1);
  });

  it('should render disabled', () => {
    let mockedOnPress = jest.fn();
    if (Platform.OS === 'web') {
      let { getByText } = renderWeb(<DisabledButton onPress={mockedOnPress} />);
      let element = getByText('PRESS ME!');
      fireEventWeb.mouseDown(element);
      fireEventWeb.mouseUp(element);
      expect(element).toBeTruthy();
    } else {
      let { getByText } = render(<DisabledButton onPress={mockedOnPress} />);
      let element = getByText('PRESS ME!');
      // NOTE: Disable this as this is still an issue (https://github.com/callstack/react-native-testing-library/issues/28)
      // fireEvent.press(element);
      expect(element).toBeTruthy();
    }
    expect(mockedOnPress).toBeCalledTimes(0);
  });
});
