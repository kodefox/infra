import React, { ReactNode, useMemo, ComponentType } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import deepmerge from 'deepmerge';

import DefaultLoadingPlaceholder from './LoadingPlaceholder';
import ToastContainer from './ToastContainer';
import useLoadFont from '../helpers/useLoadFont';
import { ThemeContext } from '../helpers/useTheme';
import { BuiltInFonts } from '../constants/fonts';
import { DefaultTheme } from '../constants/themes';
import { Theme, ThemeShape, FontSource } from '../types';

type Props = {
  children: ReactNode;
  theme?: ThemeShape;
  /**
   * Record of fonts to load.
   * Defaults to the Rubik font families.
   */
  fonts?: Record<string, FontSource>;
  /**
   * Set to true to skip the font loading.
   * Defaults to false.
   */
  skipFontLoading?: boolean;
  /**
   * Component rendered during the font loading.
   * Only relevant when `skipFontLoading` is false and using Expo.
   */
  LoadingPlaceholder?: ComponentType<{ theme: Theme }>;
};

function Provider({
  theme = {},
  children,
  fonts = BuiltInFonts,
  skipFontLoading = false,
  LoadingPlaceholder = DefaultLoadingPlaceholder,
  ...otherProps
}: Props) {
  let isFontLoaded = useLoadFont(fonts, skipFontLoading);

  let mergedTheme = useMemo(() => deepmerge(DefaultTheme, theme), [
    theme,
  ]) as Theme;

  if (!isFontLoaded) {
    return <LoadingPlaceholder theme={mergedTheme} />;
  }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <PaperProvider theme={theme} {...otherProps}>
        {children}
        <ToastContainer />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export default Provider;
