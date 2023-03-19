import type { ColorTheme } from 'style/types';
import type { LanguageCode } from 'SettingsModule/types';

export interface User {
  id: number;
  username: string;
  last_login: string;
  language: LanguageCode;
  ui_size: string;
  color_theme: ColorTheme;
  access_level: number;
}
