import { createContext, useContext } from 'react';

import { Fonts } from '../types';

let FontsContext = createContext<Fonts | null>(null);

function useFonts() {
  return useContext(FontsContext);
}

export { FontsContext, useFonts };
