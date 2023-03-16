/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { ColorTheme, UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { SELECT_LANGUAGE, CREATE_ADMIN, IMPORTANT_NOTICE } from './constants';

/* ------------------------------------ - ----------------------------------- */

export interface AppStartingState {
  step: number;
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
  username: string;
  password: string;
}

export type Step =
  | typeof SELECT_LANGUAGE
  | typeof CREATE_ADMIN
  | typeof IMPORTANT_NOTICE;
