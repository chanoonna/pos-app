import type { LanguageCode } from './types';

import english from './english.json';
import korean from './korean.json';

export const ENGLISH = 'ENGLISH' as const;
export const KOREAN = 'KOREAN' as const;

export const LANGUAGE = {
  [ENGLISH]: { languageCode: ENGLISH, languageLabel: 'English' },
  [KOREAN]: { languageCode: KOREAN, languageLabel: '한국어' }
} as const;

export interface Labels {
  SettingsModal: {
    title: string;
  };
  LanguageSelector: {
    language: string;
  };
  SizeAndColorOptions: {
    uiSize: string;
    uiSizeMedium: string;
    uiSizeLarge: string;
    uiSizeExtraLarge: string;
    colorTheme: string;
    colorThemeDefault: string;
    colorThemeDark: string;
  };
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.KOREAN.languageCode]: korean,
  [LANGUAGE.ENGLISH.languageCode]: english
};
