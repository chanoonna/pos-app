import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

interface Labels {
  login: string;
  username: string;
  password: string;
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.KOREAN.languageCode]: korean,
  [LANGUAGE.ENGLISH.languageCode]: english
};
