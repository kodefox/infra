import React from 'react';
import { Provider } from 'exoflex';

import RootNavigator from './RootNavigator';

function App() {
  return (
    <Provider useSystemFonts={false}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
