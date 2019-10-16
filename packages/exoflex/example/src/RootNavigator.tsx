import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerActions,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import ExampleList from './ExampleList';
import Welcome from './Welcome';
import renderExample from './renderExample';
import { EXAMPLES } from './examples';

const AppNavigator = createDrawerNavigator(
  {
    welcome: ({ navigation }) =>
      renderExample(<Welcome />, navigation.openDrawer),
    ...Object.entries(EXAMPLES).reduce((o, [name, Example]) => {
      o[name] = ({ navigation }) =>
        renderExample(<Example />, navigation.openDrawer);
      return o;
    }, {}),
  },
  {
    // eslint-disable-next-line react/display-name
    contentComponent: ({ navigation }: DrawerContentComponentProps) => (
      <ExampleList
        closeDrawer={() =>
          navigation.dispatch({ type: DrawerActions.CLOSE_DRAWER })
        }
      />
    ),
  },
);

export default createAppContainer(AppNavigator);
