import { Platform } from 'react-native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

import { BuiltInFonts } from './fonts';
import { Theme, Fonts } from '../types';

export const SystemFonts: Fonts = Platform.select({
  web: {
    default: {
      light: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '300',
      },
      normal: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '400',
      },
      medium: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '500',
      },
      bold: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '700',
      },
    },
    italic: {
      light: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '300',
        fontStyle: 'italic',
      },
      normal: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '400',
        fontStyle: 'italic',
      },
      medium: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '500',
        fontStyle: 'italic',
      },
      bold: {
        name: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: '700',
        fontStyle: 'italic',
      },
    },
  },
  ios: {
    default: {
      light: {
        name: 'System',
        weight: '300',
      },
      normal: {
        name: 'System',
        weight: '400',
      },
      medium: {
        name: 'System',
        weight: '500',
      },
      bold: {
        name: 'System',
        weight: '700',
      },
    },
    italic: {
      light: {
        name: 'System',
        weight: '300',
        fontStyle: 'italic',
      },
      normal: {
        name: 'System',
        weight: '400',
        fontStyle: 'italic',
      },
      medium: {
        name: 'System',
        weight: '500',
        fontStyle: 'italic',
      },
      bold: {
        name: 'System',
        weight: '700',
        fontStyle: 'italic',
      },
    },
  },
  default: {
    default: {
      light: {
        name: 'sans-serif-light',
        weight: 'normal',
      },
      normal: {
        name: 'sans-serif',
        weight: 'normal',
      },
      medium: {
        name: 'sans-serif-medium',
        weight: 'normal',
      },
      bold: {
        name: 'sans-serif-condensed',
        weight: 'normal',
      },
    },
    italic: {
      light: {
        name: 'sans-serif-light',
        weight: 'normal',
        fontStyle: 'italic',
      },
      normal: {
        name: 'sans-serif',
        weight: 'normal',
        fontStyle: 'italic',
      },
      medium: {
        name: 'sans-serif-medium',
        weight: 'normal',
        fontStyle: 'italic',
      },
      bold: {
        name: 'sans-serif-condensed',
        weight: 'normal',
        fontStyle: 'italic',
      },
    },
  },
});

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
    disabled: '#f8f8f8',
    /**
     * border color of elements, such as textinput box
     */
    border: '#e8e8e8',
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
    error: '#dd0101',
  },
  /**
   * roundness of common elements, such as buttons.
   */
  roundness: 4,
  fonts: SystemFonts,
};

export const RubikFonts = {
  default: {
    light: {
      name: 'RubikLight',
      weight: '300',
      source: BuiltInFonts.RubikLight,
    },
    normal: {
      name: 'RubikRegular',
      weight: '400',
      source: BuiltInFonts.RubikRegular,
    },
    medium: {
      name: 'RubikMedium',
      weight: '500',
      source: BuiltInFonts.RubikMedium,
    },
    bold: {
      name: 'RubikBold',
      weight: '700',
      source: BuiltInFonts.RubikBold,
    },
  },
  italic: {
    light: {
      name: 'RubikLightItalic',
      weight: '300',
      source: BuiltInFonts.RubikLightItalic,
    },
    normal: {
      name: 'RubikRegularItalic',
      weight: '400',
      source: BuiltInFonts.RubikRegularItalic,
    },
    medium: {
      name: 'RubikMediumItalic',
      weight: '500',
      source: BuiltInFonts.RubikMediumItalic,
    },
    bold: {
      name: 'RubikBoldItalic',
      weight: '700',
      source: BuiltInFonts.RubikBoldItalic,
    },
  },
};
