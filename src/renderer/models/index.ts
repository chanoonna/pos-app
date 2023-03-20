import { UiSize, ColorTheme } from 'style/types';
import { LanguageCode } from 'SettingsModule/types';

export interface User {
  id: number;
  username: string;
  lastLogin: string;
  accessLevel: number;
}

export interface Settings {
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
}
