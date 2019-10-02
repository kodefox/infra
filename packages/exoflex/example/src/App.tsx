import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { loadAsync } from 'expo-font';
import {
  ActivityIndicator,
  Text,
  Provider,
  DefaultTheme,
  BuiltInFonts,
  Slider,
  Collapsible,
  Button,
  Checkbox,
  Toast,
  Drawer,
  TextInput,
  IconButton,
} from 'exoflex';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import drawerImage from '../assets/drawer_header.png';

export default function App() {
  let [isFontLoaded, setFontLoaded] = useState(false);
  let [visible, setVisible] = useState(false);
  let [checked, setCheckbox] = useState(false);

  let drawer = useRef<DrawerLayout>(null);

  useEffect(() => {
    loadAsync(BuiltInFonts).then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!isFontLoaded) {
    return <ActivityIndicator />;
  }

  let renderDrawer = () => (
    <Drawer.Section
      headerMode="full"
      // headerSource={{ uri: 'https://picsum.photos/300' }}
      headerSource={drawerImage}
      footerLabel="Sign out"
      footerIcon="exit-to-app"
      footerOnPress={() => alert('Sign out pressed!')}
    >
      <Drawer.Item
        label="First Item"
        icon="home"
        active={true}
        onPress={() => {}}
      />
      <Drawer.Item
        label="Second Item"
        icon="settings"
        active={false}
        onPress={() => {}}
      />
    </Drawer.Section>
  );

  return (
    <Provider theme={DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerLayout
          ref={drawer}
          // drawerWidth={200}
          // drawerType="front"
          drawerBackgroundColor="#ddd"
          renderNavigationView={renderDrawer}
        >
          <ScrollView contentContainerStyle={styles.container}>
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
            <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
              <Text>Open drawer</Text>
            </TouchableOpacity>
            <Checkbox
              label="Agree"
              checked={checked}
              onPress={(newCheckValue: boolean) => setCheckbox(newCheckValue)}
            />
            <Checkbox
              label="Agree"
              checked={checked}
              onPress={(newCheckValue: boolean) => setCheckbox(newCheckValue)}
              disabled
            />
            <IconButton icon="camera" />
            <IconButton icon="settings" onPress={() => {}} color="red" />
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
            <TextInput
              label="Input Label (Default)"
              placeholder="Hint Text"
              containerStyle={{ marginVertical: 10 }}
            />
            <TextInput
              label="Input Label (Disabled)"
              value="Input Text"
              disabled={true}
              containerStyle={{ marginVertical: 10 }}
            />
            <TextInput
              label="Input Label (Focus)"
              value="Input Text"
              containerStyle={{ marginVertical: 10 }}
            />
            <TextInput
              label="Input Label (Error)"
              value="Input Text"
              errorMessage="Something Went Wrong"
              containerStyle={{ marginVertical: 10 }}
            />
          </ScrollView>
        </DrawerLayout>
        <Toast visible={visible} mode="success">
          Info Messages
        </Toast>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
