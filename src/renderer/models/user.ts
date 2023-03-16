import { LanguageCode } from 'SettingsModule/types';

export interface User {
  id: number;
  username: string;
  date: string;
  language: LanguageCode;
  accessLevel: number;
}
