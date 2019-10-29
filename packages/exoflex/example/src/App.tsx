import React from 'react';
import { Provider, RubikFonts } from 'exoflex';

import RootNavigator from './RootNavigator';

let customTheme = {
  fonts: RubikFonts,
};

function App() {
  return (
    <Provider theme={customTheme}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
