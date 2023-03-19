import { LanguageCode } from '../../../renderer/modules/SettingsModule/types';
import { ColorTheme, UiSize } from '../../../renderer/style/types';

export interface CreateUserParams {
  username: string;
  password: string;
  language: LanguageCode;
  ui_size: UiSize;
  color_theme: ColorTheme;
  access_level: number;
}

export interface GetUsersParams {
  id?: number;
  username?: string;
  is_archived?: number;
  access_level?: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
  language: LanguageCode;
  ui_size: UiSize;
  color_theme: ColorTheme;
  is_archived: number;
  access_level: number;
  last_login: string;
}
