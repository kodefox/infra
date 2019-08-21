import { Theme } from '../types';

export const DefaultTheme: Theme = {
  fonts: {
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
  },
};
