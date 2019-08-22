import { Theme } from '../types';

export const DefaultTheme: Theme = {
  fonts: {
    default: {
      light: {
        name: 'RubikLight',
        weight: '300',
      },
      normal: {
        name: 'RubikRegular',
        weight: '400',
      },
      medium: {
        name: 'RubikMedium',
        weight: '500',
      },
      bold: {
        name: 'RubikBold',
        weight: '700',
      },
    },
    italic: {
      light: {
        name: 'RubikLightItalic',
        weight: '300',
      },
      normal: {
        name: 'RubikRegularItalic',
        weight: '400',
      },
      medium: {
        name: 'RubikMediumItalic',
        weight: '500',
      },
      bold: {
        name: 'RubikBoldItalic',
        weight: '700',
      },
    },
  },
};
