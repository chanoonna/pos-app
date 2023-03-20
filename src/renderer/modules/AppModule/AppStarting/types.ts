/* -------------------------------- constants ------------------------------- */
import { SYSTEM_SETTINGS, CREATE_ADMIN, BEFORE_STARTING } from './constants';

/* ------------------------------------ - ----------------------------------- */

export interface AppStartingState {
  step: number;
  username: string;
  password: string;
  confirmPassword: string;
}

export type Step =
  | typeof SYSTEM_SETTINGS
  | typeof CREATE_ADMIN
  | typeof BEFORE_STARTING;
