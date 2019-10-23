import { Theme as PaperTheme } from 'react-native-paper';

import { Theme, Fonts, Font } from '../types';

function getPaperFontConfig(font: Font): PaperTheme['fonts']['regular'] {
  return {
    fontFamily: font.name,
    fontWeight: font.weight,
  };
}

function getPaperFonts(fonts: Fonts): PaperTheme['fonts'] {
  let light = getPaperFontConfig(fonts.default.light);

  return {
    thin: light,
    light,
    regular: getPaperFontConfig(fonts.default.normal),
    medium: getPaperFontConfig(fonts.default.medium),
  };
}

function getPaperTheme(theme: Theme): PaperTheme {
  return {
    ...theme,
    fonts: getPaperFonts(theme.fonts),
  };
}

export default getPaperTheme;
