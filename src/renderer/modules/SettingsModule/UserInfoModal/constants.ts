import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

export interface Labels {
  language: string;
  createAdmin: string;
  createUser: string;
  updateMyInfo: string;
  username: string;
  usernameTooltip: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  confirmPasswordError: string;
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.ENGLISH.languageCode]: english,
  [LANGUAGE.KOREAN.languageCode]: korean
};
