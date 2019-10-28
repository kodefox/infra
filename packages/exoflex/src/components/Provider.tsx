import React, { ReactNode, useMemo, ComponentType } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import DefaultLoadingPlaceholder from './LoadingPlaceholder';
import ToastContainer from './ToastContainer';
import getFontsSource from '../helpers/getFontsSource';
import mergeTheme from '../helpers/mergeTheme';
import useLoadFonts from '../helpers/useLoadFonts';
import { ThemeContext } from '../helpers/useTheme';
import { DefaultTheme, SystemFontsTheme } from '../constants/themes';
import { Theme, ThemeShape, FontSource } from '../types';

type Props = {
  children: ReactNode;
  theme?: ThemeShape;
  /**
   * @deprecated specify font source on the theme instead.
   * Record of fonts to load.
   * Will be loaded only when `expo-font` module is available.
   * Defaults to the Rubik font families.
   */
  fonts?: Record<string, FontSource>;
  /**
   * Set to true to use fonts available in the system instead of loading
   * custom fonts.
   * Implies `skipFontsLoading` set to true.
   * Defaults to true.
   */
  useSystemFonts?: boolean;
  /**
   * Set to true to skip the fonts loading.
   * Defaults to false.
   */
  skipFontsLoading?: boolean;
  /**
   * Component rendered during the fonts loading.
   * Only relevant when `skipFontsLoading` is false.
   */
  LoadingPlaceholder?: ComponentType<{ theme: Theme }>;
};

function Provider({
  theme = {},
  children,
  useSystemFonts = true,
  fonts,
  skipFontsLoading = false,
  LoadingPlaceholder = DefaultLoadingPlaceholder,
  ...otherProps
}: Props) {
  let { mergedTheme, fontsSource } = useMemo(() => {
    let mergedTheme = mergeTheme(
      DefaultTheme,
      useSystemFonts ? SystemFontsTheme : {},
      theme,
    );

    return { mergedTheme, fontsSource: getFontsSource(mergedTheme.fonts) };
  }, [theme, useSystemFonts]);

  let isFontLoaded = useLoadFonts(
    fontsSource,
    useSystemFonts || skipFontsLoading,
  );

  if (fonts) {
    // eslint-disable-next-line no-console
    console.warn(
      'Using `fonts` for loading fonts is no longer supported, please specify the font source on the theme instead.',
    );
  }

  if (!isFontLoaded) {
    return <LoadingPlaceholder theme={mergedTheme} />;
  }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <PaperProvider theme={mergedTheme} {...otherProps}>
        {children}
        <ToastContainer />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export default Provider;
