import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from 'naviflex';
import { Drawer } from 'exoflex';

import { EXAMPLES } from './examples';

type Props = {
  closeDrawer: () => void;
};

function ExampleList({ closeDrawer }: Props) {
  let { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
      <FlatList
        data={Object.values(EXAMPLES)}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Drawer.Item
            label={item.title}
            onPress={() => {
              navigate(item.title.toLowerCase());
              closeDrawer();
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default ExampleList;
