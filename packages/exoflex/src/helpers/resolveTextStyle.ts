import { TextStyle } from 'react-native';

import { FontWeights } from '../constants/fonts';
import { Fonts, FontStyle, FontWeight } from '../types';

export default function resolveTextStyle(
  availableFonts: Fonts,
  fontPresetName: string,
  fontWeight: FontWeight,
  fontStyle: FontStyle = 'normal',
): TextStyle | undefined {
  let useItalicPreset = fontStyle === 'italic';

  let fontPreset = availableFonts[useItalicPreset ? 'italic' : fontPresetName];

  if (!fontPreset) {
    console.warn(`Font preset "${fontPreset}" not found`);
    return;
  }

  let font = fontPreset[FontWeights[fontWeight]];

  return {
    fontFamily: font.name,
    fontWeight: font.weight,
    fontStyle,
    fontSize: font.size || 14,
  };
}
