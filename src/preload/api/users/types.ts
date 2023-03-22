import { LanguageCode } from '../../../renderer/modules/SettingsModule/types';
import { ColorTheme, UiSize } from '../../../renderer/style/types';

export interface CreateUserParamsDB {
  username: string;
  password: string;
  access_level: number;
}

export interface GetUsersParams {
  id?: number;
  username?: string;
  is_archived?: number;
  access_level?: number;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface UserDB {
  id: number;
  username: string;
  password: string;
  is_archived: number;
  access_level: number;
  last_login: string;
}
