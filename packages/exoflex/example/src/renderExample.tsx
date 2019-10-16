import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { DefaultTheme } from 'exoflex';

function renderExample(el, openDrawer) {
  return (
    <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
      <Appbar.Header theme={DefaultTheme}>
        <Appbar.Action icon="menu" onPress={() => openDrawer()} />
        <Appbar.Content
          title={(el && el.type.title) || ''}
          titleStyle={{ fontFamily: 'RubikRegular' }}
        />
      </Appbar.Header>
      {el}
    </View>
  );
}

export default renderExample;
