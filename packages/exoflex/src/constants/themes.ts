import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

import { Theme } from '../types';

export const DefaultTheme: Theme = {
  ...PaperDefaultTheme,
  colors: {
    /**
     * primary color for your app, usually your brand color.
     */
    primary: '#0099dd',
    /**
     * secondary color for your app which complements the primary color.
     */
    accent: '#32ade3',
    /**
     * background color for pages, such as lists.
     */
    background: '#ffffff',
    /**
     * background color for elements containing content, such as cards.
     */
    surface: '#ffffff',
    /**
     * text color for content.
     */
    text: '#2d2d2d',
    /**
     * color for disabled elements.
     */
    disabled: '#e8e8e8',
    /**
     * color for placeholder text, such as input placeholder.
     */
    placeholder: '#2d2d2d',
    /**
     * color for backdrops of various components such as modals.
     */
    backdrop: 'rgba(0, 0, 0, 0.4)',
    /**
     * color for backdrops of various components such as modals.
     */
    error: '#dd0000',
  },
  /**
   * roundness of common elements, such as buttons.
   */
  roundness: 4,
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
