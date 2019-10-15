import React from 'react';
import Provider from '../Provider';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('should render normally', () => {
    let { getByText } = render(
      <Provider>
        <Button preset="primary">This is primary button</Button>
        <Button preset="secondary">This is secondary button</Button>
      </Provider>,
    );
    expect(getByText('THIS IS PRIMARY BUTTON')).toBeTruthy();
    expect(getByText('THIS IS SECONDARY BUTTON')).toBeTruthy();
  });

  it('should render normally with icon', () => {
    let { getByText } = render(
      <Provider>
        <Button preset="primary" icon="home">
          This is primary button with icon
        </Button>
      </Provider>,
    );
    expect(getByText('THIS IS PRIMARY BUTTON WITH ICON')).toBeTruthy();
  });

  it('should run onPress', () => {
    let mockPress = jest.fn();
    let { getByText } = render(
      <Provider>
        <Button preset="primary" onPress={mockPress}>
          Press me!
        </Button>
      </Provider>,
    );
    fireEvent.mouseDown(getByText('PRESS ME!'));
    fireEvent.mouseUp(getByText('PRESS ME!'));
    expect(mockPress).toBeCalledTimes(1);
  });

  it('should render disabled', () => {
    let mockPress = jest.fn();
    let { getByText } = render(
      <Provider>
        <Button disabled preset="primary" onPress={mockPress}>
          Press me!
        </Button>
      </Provider>,
    );
    let element = getByText('PRESS ME!');
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    expect(element).toBeTruthy();
    expect(mockPress).toBeCalledTimes(0);
  });
});
