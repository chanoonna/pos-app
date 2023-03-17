/* -------------------------------- constants ------------------------------- */
import { COLOR_THEME } from './constants';

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
            fontSize: '1rem',
            height: 'fit-content',
            width: 'fit-content'
          }
        },
        {
          props: { size: 'large' },
          style: {
            fontSize: '1.15rem',
            height: 'fit-content',
            width: 'fit-content'
          }
        },
        {
          props: { size: 'extraLarge' },
          style: {
            fontSize: '1.3rem',
            height: 'fit-content',
            width: 'fit-content'
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
  // [COLOR_THEME.MIXED]: customMixedTheme,
  [COLOR_THEME.DEFAULT]: customTheme,
  [COLOR_THEME.DARK]: customDarkTheme
};

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    medium: true;
    large: true;
    extraLarge: true;
  }
}
