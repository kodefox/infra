import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, ScrollView } from 'react-native';
import { TabView as RNTabView, SceneMap } from 'react-native-tab-view';
import { TabView, Button } from 'exoflex';

const imageUri =
  'https://images.unsplash.com/photo-1581963857936-fae00e457fb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

let images = [];
for (let i = 0; i < 100; i++) {
  images.push(
    <Image
      source={{ uri: imageUri }}
      style={{ width: '100%', height: 200, marginVertical: 10 }}
    />,
  );
}

const FirstRoute = () => (
  <ScrollView
    contentContainerStyle={[
      styles.scene,
      { backgroundColor: '#ff4081', padding: 10, paddingHorizontal: 20 },
    ]}
  >
    {images}
  </ScrollView>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = (props) => {
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

// const initialLayout = { width: Dimensions.get('window').width };

function TabExample() {
  const [index, setIndex] = useState(0);
  // const [routes] = React.useState([
  //   { key: 'first', title: 'First' },
  //   { key: 'second', title: 'Second' },
  //   { key: 'third', title: 'Third' },
  //   { key: 'fourth', title: 'Fourth' },
  // ]);

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

  // let scenes = {
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  //   fourth: FourthRoute,
  // };

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
      // tabItemStyle={{ backgroundColor: 'white' }}
      // tabItemTextStyle={{ color: 'red' }}
      // tabIndicatorStyle={{ backgroundColor: 'brown' }}
      // style={{ backgroundColor: 'white' }}
    />
  );

  // return (
  //   <RNTabView
  //     navigationState={{ index, routes }}
  //     renderScene={renderScene}
  //     onIndexChange={setIndex}
  //     initialLayout={initialLayout}
  //   />
  // );
}

// function TabHooksExample() {
//   const [routes] = React.useState([
//     { key: 'first', title: 'First', scene: FirstRoute },
//     { key: 'second', title: 'Second', scene: SecondRoute },
//   ]);

//   let {TabView, jumpTo, routes} = useTabView(routes);

//   return <TabView />;
// }

TabExample.title = 'Tab';

let styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default TabExample;
