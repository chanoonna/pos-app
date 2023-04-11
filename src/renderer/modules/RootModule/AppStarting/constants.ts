import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

export interface Labels {
  language: string;
  systemSettings: string;
  createAdmin: string;
  beforeStarting: string;
  beforeStartingCaution: string;
  beforeStartingText1: string;
  beforeStartingTextClickHere: string;
  beforeStartingText2: string;
  beforeStartingText3: string;
  next: string;
  noPasswordMatchTooltip: string;
  back: string;
  agree: string;
  username: string;
  usernameTooltip: string;
  password: string;
  confirmPassword: string;
  confirmPasswordError: string;
  licenseHeader: string;
  license1: string;
  license2: string;
  license3: string;
  license4: string;
  license5: string;
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.ENGLISH.languageCode]: english,
  [LANGUAGE.KOREAN.languageCode]: korean
};

export const SYSTEM_SETTINGS = 'systemSettings' as const;
export const CREATE_ADMIN = 'createAdmin' as const;
export const BEFORE_STARTING = 'beforeStarting' as const;
