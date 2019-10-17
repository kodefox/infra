import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from 'naviflex';
import { Drawer } from 'exoflex';

import { EXAMPLES } from './examples';

type Props = {
  activeExample: string;
  closeDrawer: () => void;
};

function ExampleList({ activeExample, closeDrawer }: Props) {
  let { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
      <FlatList
        data={Object.values(EXAMPLES)}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Drawer.Item
            active={activeExample === item.title.toLowerCase()}
            label={item.title}
            onPress={() => {
              navigate(item.title.toLowerCase());
              closeDrawer();
            }}
            style={{ height: 40, paddingVertical: 0 }}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default ExampleList;
