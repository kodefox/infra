import React, { useRef } from 'react';
import { View } from 'react-native';
import { useRoutes, usePath } from 'hookrouter';
import { Text } from 'exoflex';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import { ROUTES } from './examples';
import ExampleList from './ExampleList';
import renderExample from './renderExample';

function RootNavigator() {
  let match = useRoutes({ ...ROUTES });
  let path: string = usePath();
  let drawer = useRef<DrawerLayout>(null);

  return (
    <DrawerLayout
      ref={drawer}
      drawerBackgroundColor="#ddd"
      renderNavigationView={() => (
        <ExampleList
          activeExample={path.slice(1)}
          closeDrawer={() => drawer.current.closeDrawer()}
        />
      )}
    >
      {match ? (
        renderExample(match, () => drawer.current.openDrawer())
      ) : (
        <NotFoundScreen />
      )}
    </DrawerLayout>
  );
}

function NotFoundScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
      }}
    >
      <Text>Page not found.</Text>
    </View>
  );
}

export default RootNavigator;
