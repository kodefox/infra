import RubikBold from '../../assets/fonts/Rubik-Bold.ttf';
import RubikBoldItalic from '../../assets/fonts/Rubik-BoldItalic.ttf';
import RubikLight from '../../assets/fonts/Rubik-Light.ttf';
import RubikLightItalic from '../../assets/fonts/Rubik-LightItalic.ttf';
import RubikMedium from '../../assets/fonts/Rubik-Medium.ttf';
import RubikMediumItalic from '../../assets/fonts/Rubik-MediumItalic.ttf';
import RubikRegular from '../../assets/fonts/Rubik-Regular.ttf';
import RubikRegularItalic from '../../assets/fonts/Rubik-RegularItalic.ttf';

import { Fonts, FontWeight, FontPreset } from '../types';

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

export const DefaultThemeFonts: Fonts = {
  default: {
    light: {
      name: 'Rubik-Light',
      weight: '300',
    },
    normal: {
      name: 'Rubik-Regular',
      weight: '400',
    },
    medium: {
      name: 'Rubik-Medium',
      weight: '500',
    },
    bold: {
      name: 'Rubik-Bold',
      weight: '700',
    },
  },
  italic: {
    light: {
      name: 'Rubik-LightItalic',
      weight: '300',
    },
    normal: {
      name: 'Rubik-RegularItalic',
      weight: '400',
    },
    medium: {
      name: 'Rubik-MediumItalic',
      weight: '500',
    },
    bold: {
      name: 'Rubik-BoldItalic',
      weight: '700',
    },
  },
};

export const BuiltInFonts = {
  RubikBold,
  RubikBoldItalic,
  RubikLight,
  RubikLightItalic,
  RubikMedium,
  RubikMediumItalic,
  RubikRegular,
  RubikRegularItalic,
};
