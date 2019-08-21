import { TextStyle } from 'react-native';

import { FontWeights } from '../constants/fonts';
import { Fonts, FontStyle, FontWeight } from '../types';

export default function resolveTextStyle(
  availableFonts: Fonts,
  fontPresetName: string,
  fontWeight: FontWeight,
  fontStyle: FontStyle = 'normal',
): TextStyle {
  let fontPreset = availableFonts[fontPresetName];

  if (!fontPreset) {
    throw new Error(`Font preset "${fontPreset}" not found`);
  }

  let font = fontPreset[FontWeights[fontWeight]];

  if (!font) {
    throw new Error(`Font "${font}" not found`);
  }

  return {
    fontFamily: font.name,
    fontWeight: font.weight,
    fontStyle,
    fontSize: font.size || 14,
  };
}
