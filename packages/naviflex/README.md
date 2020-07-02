> **THIS PACKAGE IS DEPRECATED AS REACT-NAVIGATION FOR WEB IS STABLE NOW**

# naviflex · ![npm](https://img.shields.io/npm/v/naviflex)

This is a wrapper that will wrap the functionality of `react-navigation` and `hookrouter` so you will be able to do navigation using the same syntax on multi-platform between `mobile`, and `web`.

> ~We will deprecate this library when `react-navigation` for the web is ready and stable for production~

## Pre-requisites

Install both hookrouter and react-navigation:

```
yarn add hookrouter react-navigation
```

> You can install just one of them if your project not supporting multi-platform

## Installation

After you install the pre-requisites libraries, you can install naviflex using npm or yarn.

```
yarn add naviflex
```

If you are using TypeScript, naviflex is built using TypeScript and we shipped it along with the `.d.ts` file, so you do not have to install `@types/naviflex`.

## Available Syntax

Currently, there are four syntaxes available through naviflex. But these four syntaxes are the main syntax that frequently used on many projects.

#### navigate

This navigate function receives four parameters similar to [react-navigation](https://reactnavigation.org/docs/en/navigation-prop.html#navigate-link-to-other-screens):

- `routeName` - A destination routeName that has been registered somewhere in the app's router
- `params` - Params to merge into the destination route
- `action` - (advanced) The sub-action to run in the child router, if the screen is a navigator
- `key` - Optional identifier of what route to navigate to. Navigate back to this route, if it already exists

Currently, the web side doesn't support `action` and `key` yet. You still could put it on parameters but there will be no effect on the web.

#### replace

This replace function receives three parameters similar to navigate without `key`. But this will replace the current screen, so you won't be able to move back to the current screen.

Currently, the web side doesn't support `action` yet. You still could put it on parameters but there will be no effect on the web.

#### goBack

This goBack function receives the same parameter as [react-navigation](https://reactnavigation.org/docs/en/navigation-prop.html#goback-close-the-active-screen-and-move-back). Except, the parameter won't have any effect on the web.

#### getParam

This getParam function receives the same parameters as [react-navigation](https://reactnavigation.org/docs/en/navigation-prop.html#getparam-get-a-specific-param-value-with-a-fallback).

You can use it on the web similarly with the mobile:

```tsx
import {useNavigation} from 'naviflex';

function SomeScreen() {
  let {getParam} = useNavigation();
  let name = getParam('name');
  return <View />;
}
```

## Usage

The purpose of this library is to make the usage of web navigation similar to `react-navigation`.

Despite that, you still need to set up the router differently.

### Router on the mobile platform

```tsx
// This is using react-navigation@3.x.x
import {createAppContainer, createStackNavigator} from 'react-navigation';

import FirstScreen from '../screens/First';
import SecondScreen from '../screens/Second';
import ThirdScreen from '../screens/Third';

const AppStack = createStackNavigator({
  first: FirstScreen,
  second: SecondScreen,
  third: ThirdScreen,
});

export default createAppContainer(AppStack);
```

### Router on the web platform

```tsx
import React from 'react';
import {View, Text} from 'react-native';
import {useRoutes} from 'hookrouter';

import FirstScreen from '../screens/First';
import SecondScreen from '../screens/Second';
import ThirdScreen from '../screens/Third';

const ROUTES = {
  '/': () => <FirstScreen />,
  '/first': () => <FirstScreen />,
  '/second': () => <SecondScreen />,
  '/third': () => <ThirdScreen />,
};

function NotFoundScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Page not found.</Text>
    </View>
  );
}

export default function() {
  const match = useRoutes({...ROUTES});
  return match || <NotFoundScreen />;
}
```

You can check [hookrouter](https://github.com/Paratron/hookrouter) for more details.

### Screen component

```tsx
import React from 'react';
import {View, Text, Button} from 'react-native';

import {useNavigation} from 'naviflex';

export default function SecondScreen() {
  let {navigate, goBack} = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Second Screen</Text>
      <Button title="Go to Third Screen" onPress={() => navigate('third')} />
      <Button title="Back to First Screen" onPress={() => goBack()} />
    </View>
  );
}
```
