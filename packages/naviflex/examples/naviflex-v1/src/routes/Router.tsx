import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FirstScreen from "../screens/First";
import SecondScreen from "../screens/Second";
import ThirdScreen from "../screens/Third";

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="first" component={FirstScreen} />
        <Stack.Screen name="second" component={SecondScreen} />
        <Stack.Screen name="third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
