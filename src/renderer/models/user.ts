import type { ColorTheme, UiSize } from 'style/types';
import type { LanguageCode } from 'SettingsModule/types';

export interface User {
  id: number;
  username: string;
  lastLogin: string;
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
  accessLevel: number;
}
