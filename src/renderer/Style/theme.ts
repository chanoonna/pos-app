/* ---------------------------------- types --------------------------------- */
import type { TextTypeVariant, UiSize } from 'style/types';

import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

export const colors = {
  /* Black-ish */
  backgroundBlack1: '#202124',
  backgroundBlack2: '#121212',
  backgroundBlack3: '#202D3B',
  backgroundBlack4: '#272727',

  /* Blue */
  extraLightBlue1: '#E3F2FD',
  lightBlue1: '#A0D0FF',
  lightBlue2: '#90CAF9',
  mediumBlue1: '#63C5DA',
  deepBlue1: '#1F60F0',
  navyBlue1: '#051094',

  /* Pruple */
  deepPurple1: '#401F88',

  /* Gray */
  backgroundGray1: '#C0C0C0',
  extraLightGray1: '#F0F0F0',
  lightGray1: '#D0D0D0',
  mediumGray1: '#8A8A8A',
  darkGray1: '#5E5E5E',
  charcoalGray1: '#404040',
  charcoalGray2: '#2E2E2E',
  charcoalGray3: '#121212',

  white: '#FFFFFF',
  black: '#000000'
};

const headingTextFontSize = {
  medium: '1.5rem',
  large: '1.75rem',
  extraLarge: '2rem'
};

const menuTitleFontSize = {
  medium: '1.2rem',
  large: '1.3rem',
  extraLarge: '1.4rem'
};

const menuItemFontSize = {
  medium: '1rem',
  large: '1.15rem',
  extraLarge: '1.3rem'
};

const bodyTextFontSize = {
  medium: '1rem',
  large: '1.15rem',
  extraLarge: '1.3rem'
};

const tooltipTextFontSize = {
  medium: '0.9rem',
  large: '1rem',
  extraLarge: '1.1rem'
};

const helperTextFontSize = {
  medium: '0.8rem',
  large: '0.85rem',
  extraLarge: '0.9rem'
};

const iconSize = {
  medium: '1.5rem',
  large: '1.75rem',
  extraLarge: '2rem'
};

export const fontSize: Record<TextTypeVariant, Record<UiSize, string>> = {
  heading: headingTextFontSize,
  menuTitle: menuTitleFontSize,
  menu: menuItemFontSize,
  body: bodyTextFontSize,
  tooltip: tooltipTextFontSize,
  helper: helperTextFontSize,
  icon: iconSize
};

const customThemeBase = {
  typography: {
    button: {
      fontSize: '1rem'
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            fontSize: '1rem'
          }
        },
        {
          props: { size: 'large' },
          style: {
            fontSize: '1.15rem'
          }
        },
        {
          props: { size: 'extraLarge' },
          style: {
            fontSize: '1.3rem'
          }
        }
      ]
    }
  }
};
const customThemeDefault = {};
const customThemeDark = {
  palette: {
    mode: 'dark' as const
  }
};
const customThemeMixed = {};

const customTheme = createTheme(deepmerge(customThemeDefault, customThemeBase));
const customDarkTheme = createTheme(
  deepmerge(customThemeDark, customThemeBase)
);
const customMixedTheme = createTheme(
  deepmerge(customThemeMixed, customThemeBase)
);

export const theme = {
  // mixed: customMixedTheme,
  bright: customTheme,
  dark: customDarkTheme
};

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    medium: true;
    large: true;
    extraLarge: true;
  }
}
