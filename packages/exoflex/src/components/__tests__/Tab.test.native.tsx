import React, { useState } from 'react';
import { View } from 'react-native';
import {
  render,
  fireEvent,
  act,
  //waitForElement,
} from 'react-native-testing-library';
import Provider from '../Provider';
import { TabView } from '../Tab';
import Text from '../Text';

const FirstRoute = () => (
  <View style={{ flex: 1 }}>
    <Text>First Route</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1 }}>
    <Text>Second Route</Text>
  </View>
);

const SCENES = [
  { title: 'First', scene: FirstRoute },
  { title: 'Second', scene: SecondRoute },
];

describe('TabView without lazy load', () => {
  it('should render with properly', () => {
    const App = () => {
      let [activeIndex, setActiveIndex] = useState(0);
      return (
        <Provider>
          <TabView
            lazyLoad={false}
            activeIndex={activeIndex}
            scenes={SCENES}
            onIndexChange={setActiveIndex}
          />
        </Provider>
      );
    };

    let { getByText } = render(<App />);

    expect(getByText('First Route')).toBeTruthy();
    expect(getByText('Second Route')).toBeTruthy();
  });

  it('should switch to tab "Second"', () => {
    const App = () => {
      let [activeIndex, setActiveIndex] = useState(0);
      return (
        <Provider>
          <TabView
            lazyLoad={false}
            activeIndex={activeIndex}
            scenes={SCENES}
            onIndexChange={setActiveIndex}
          />
        </Provider>
      );
    };

    let { getByText } = render(<App />);

    act(() => fireEvent.press(getByText('Second')));

    expect(getByText('First Route')).toBeTruthy();
    expect(getByText('Second Route')).toBeTruthy();
  });
});
