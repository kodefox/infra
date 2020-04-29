import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { TabView, Button } from 'exoflex';

const imageUri =
  'https://images.unsplash.com/photo-1581963857936-fae00e457fb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

let images = [];
for (let i = 0; i < 100; i++) {
  images.push(
    <Image
      key={i.toString()}
      source={{ uri: imageUri }}
      style={{ width: '100%', height: 200, marginVertical: 10 }}
    />,
  );
}

const FirstRoute = () => (
  <ScrollView
    contentContainerStyle={[
      {
        backgroundColor: '#ff4081',
        padding: 10,
        paddingHorizontal: 20,
      },
    ]}
  >
    {images}
  </ScrollView>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = (props: {jumpTo: (index: number) => void}) => {
  return (
    <View style={[styles.scene, { backgroundColor: 'skyblue' }]}>
      <Button onPress={() => props.jumpTo(0)} style={{ marginTop: 100 }}>
        Jump to Tab 1
      </Button>
    </View>
  );
};

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'green' }]} />
);

const FifthRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'goldenrod' }]} />
);


function TabExample() {
  const [index, setIndex] = useState(0);

  let scenes = [
    { title: 'First', scene: FirstRoute },
    { title: 'Second', scene: SecondRoute },
    { title: 'Third', scene: ThirdRoute },
    { title: 'Fourth', scene: FourthRoute },
    { title: 'Fifth', scene: FifthRoute },
  ];

  return (
    <TabView
      lazyLoad={false}
      enableSwipe
      activeIndex={index}
      scenes={scenes}
      onIndexChange={setIndex}
      // NOTE: Intentionally left these commented for easier development purpose
      // tabItemStyle={{ backgroundColor: 'white' }}
      // tabItemTextStyle={{ color: 'red' }}
      // tabIndicatorStyle={{ backgroundColor: 'brown' }}
      // style={{ backgroundColor: 'white' }}
    />
  );
}

TabExample.title = 'Tab';

let styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default TabExample;
