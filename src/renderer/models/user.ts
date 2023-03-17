import type { LanguageCode } from 'SettingsModule/types';
import { COLOR_THEME } from 'style/constants';

export interface User {
  id: number;
  username: string;
  date: string;
  language: LanguageCode;
  uiSize: string;
  colorTheme: (typeof COLOR_THEME)[keyof typeof COLOR_THEME];
  accessLevel: number;
}
