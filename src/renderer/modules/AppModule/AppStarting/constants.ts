import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

export interface Labels {
  selectLanguage: string;
  language: string;
  pleaseSelectLanguage: string;
  systemSettings: string;
  createAdmin: string;
  beforeStarting: string;
  next: string;
  disabledNextTooltip: string;
  back: string;
  start: string;
  uiSize: string;
  uiSizeMedium: string;
  uiSizeLarge: string;
  uiSizeExtraLarge: string;
  colorTheme: string;
  colorThemeDefault: string;
  colorThemeDark: string;
  username: string;
  usernameTooltip: string;
  password: string;
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.ENGLISH.languageCode]: english,
  [LANGUAGE.KOREAN.languageCode]: korean
};

export const SELECT_LANGUAGE = 'selectLanguage' as const;
export const SYSTEM_SETTINGS = 'systemSettings' as const;
export const CREATE_ADMIN = 'createAdmin' as const;
export const BEFORE_STARTING = 'beforeStarting' as const;
