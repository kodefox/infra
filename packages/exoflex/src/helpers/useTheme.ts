import { createContext, useContext } from 'react';

import { DefaultTheme } from '../constants/themes';
import { Theme } from '../types';

/**
 * TODO: Replace our useTheme with useTheme exposed by react-native-paper
 * when we update react-native-paper to v3
 */
let ThemeContext = createContext<Theme>(DefaultTheme);

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext };
export default useTheme;
