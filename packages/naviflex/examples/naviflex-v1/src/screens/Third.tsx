import React from "react";
import { View, Text, Button } from "react-native";

import { useNavigation } from "naviflex";

export default function ThirdScreen() {
  let { goBack } = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Third Screen</Text>
      <Button title="Back to Second Screen" onPress={() => goBack()} />
    </View>
  );
}
