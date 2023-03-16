import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

interface Labels {
  selectLanguage: string;
  language: string;
  pleaseSelectLanguage: string;
  createAdmin: string;
  importantNotice: string;
  next: string;
  back: string;
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.ENGLISH.languageCode]: english,
  [LANGUAGE.KOREAN.languageCode]: korean
};

export const SELECT_LANGUAGE = 'selectLanguage' as const;
export const CREATE_ADMIN = 'createAdmin' as const;
export const IMPORTANT_NOTICE = 'importantNotice' as const;
