import { createContext, useContext } from 'react';

import { DefaultTheme } from '../constants/themes';
import { Theme } from '../types';

let ThemeContext = createContext<Theme>(DefaultTheme);

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext };
export default useTheme;
