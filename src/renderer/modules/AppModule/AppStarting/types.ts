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
  username: string;
  password: string;
  confirmPassword: string;
}

export type Step =
  | typeof SELECT_LANGUAGE
  | typeof SYSTEM_SETTINGS
  | typeof CREATE_ADMIN
  | typeof BEFORE_STARTING;
