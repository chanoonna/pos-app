/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { ColorTheme, UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import {
  SELECT_LANGUAGE,
  SYSTEM_SETTINGS,
  CREATE_ADMIN,
  BEFORE_STARTING
} from './constants';

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
  | typeof SYSTEM_SETTINGS
  | typeof CREATE_ADMIN
  | typeof BEFORE_STARTING;
