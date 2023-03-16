/* ---------------------------------- types --------------------------------- */
import { LanguageCode } from 'SettingsModule/types';

/* -------------------------------- constants ------------------------------- */
import { SELECT_LANGUAGE, CREATE_ADMIN, IMPORTANT_NOTICE } from './constants';

/* ------------------------------------ - ----------------------------------- */

export interface AppStartingState {
  step: number;
  language: LanguageCode;
  username: string;
  password: string;
}

export type Step =
  | typeof SELECT_LANGUAGE
  | typeof CREATE_ADMIN
  | typeof IMPORTANT_NOTICE;
