import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

const Component = {
  AppSetup: 'AppSetup'
} as const;

interface Labels {
  [Component.AppSetup]: {
    selectLanguage: string;
    language: string;
  };
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.ENGLISH.languageCode]: english,
  [LANGUAGE.KOREAN.languageCode]: korean
};
