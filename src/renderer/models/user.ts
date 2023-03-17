import type { ColorTheme } from 'style/types';
import type { LanguageCode } from 'SettingsModule/types';

export interface User {
  id: number;
  username: string;
  date: string;
  language: LanguageCode;
  uiSize: string;
  colorTheme: ColorTheme;
  accessLevel: number;
}
