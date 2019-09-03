import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { loadAsync } from 'expo-font';
import {
  Text,
  Provider,
  DefaultTheme,
  BuiltInFonts,
  Slider,
  Collapsible,
  Button,
  Checkbox,
  Toast,
} from 'exoflex';

export default function App() {
  let [isFontLoaded, setFontLoaded] = useState(false);
  let [visible, setVisible] = useState(false);
  let [checked, setCheckbox] = useState(false);
  useEffect(() => {
    loadAsync(BuiltInFonts).then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!isFontLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider theme={DefaultTheme}>
      <View style={styles.container}>
        <Text
          onPress={() =>
            Toast.showToast({
              message: 'Warning!',
              duration: 1000,
              mode: 'error',
            })
          }
          weight="700"
        >
          Exoflex
        </Text>
        <Collapsible title="Press Me">
          <Text fontStyle="italic" onPress={() => setVisible(!visible)}>
            Hello!
          </Text>
        </Collapsible>
        <Slider values={[3, 9]} />
        <Button
          preset="primary"
          onPress={() => alert('Primary Button pressed')}
          style={{ marginVertical: 10 }}
        >
          Primary button
        </Button>
        <Button
          preset="secondary"
          onPress={() => alert('Secondary Button pressed')}
          style={{ marginVertical: 10 }}
        >
          Secondary button
        </Button>
        <Button
          preset="invisible"
          onPress={() => alert('Invisible Button pressed')}
          style={{ marginVertical: 10 }}
        >
          Invisible button
        </Button>
        <Button
          disabled
          preset="primary"
          onPress={() => alert('Primary Button pressed')}
          style={{ marginVertical: 10 }}
        >
          Disabled Primary button
        </Button>
        <Button
          disabled
          preset="secondary"
          onPress={() => alert('Secondary Button pressed')}
          style={{ marginVertical: 10 }}
        >
          Disabled Secondary button
        </Button>
        <Button
          disabled
          preset="invisible"
          onPress={() => alert('Invisible Button pressed')}
          style={{ marginVertical: 10 }}
        >
          Disabled Invisible button
        </Button>
        <Button
          icon="home"
          onPress={() => alert('Button with Icon pressed')}
          style={{ marginVertical: 10 }}
        >
          With Icon
        </Button>
        <Text fontStyle="italic">Cool</Text>
        <Checkbox
          value="Test"
          checked={checked}
          onPress={() => setCheckbox(!checked)}
        />
        <Checkbox
          value="Test"
          checked={checked}
          onPress={() => setCheckbox(!checked)}
          disabled
        />
      </View>
      <Toast visible={visible} mode="success">
        Info Messages
      </Toast>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
