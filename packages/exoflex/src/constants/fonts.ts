import RubikBold from '../assets/fonts/Rubik-Bold.ttf';
import RubikBoldItalic from '../assets/fonts/Rubik-BoldItalic.ttf';
import RubikLight from '../assets/fonts/Rubik-Light.ttf';
import RubikLightItalic from '../assets/fonts/Rubik-LightItalic.ttf';
import RubikMedium from '../assets/fonts/Rubik-Medium.ttf';
import RubikMediumItalic from '../assets/fonts/Rubik-MediumItalic.ttf';
import RubikRegular from '../assets/fonts/Rubik-Regular.ttf';
import RubikRegularItalic from '../assets/fonts/Rubik-RegularItalic.ttf';
import { FontWeight, FontPreset } from '../types';

export const FontWeights: Record<FontWeight, keyof FontPreset> = {
  light: 'light',
  normal: 'normal',
  medium: 'medium',
  bold: 'bold',
  '300': 'light',
  '400': 'normal',
  '500': 'medium',
  '700': 'bold',
};

/**
 * Font sources map to load before using Rubik font family.
 */
export const RubikSourcesMap = {
  RubikBold,
  RubikBoldItalic,
  RubikLight,
  RubikLightItalic,
  RubikMedium,
  RubikMediumItalic,
  RubikRegular,
  RubikRegularItalic,
};
