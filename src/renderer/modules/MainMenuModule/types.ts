/* -------------------------------- constants ------------------------------- */
import {
  RETAIL,
  WHOLESALE,
  REPORTS,
  INVENTORY_MANAGEMENT,
  ACCOUNT_MANAGEMENT
} from './constants';

export type MenuItem =
  | typeof RETAIL
  | typeof WHOLESALE
  | typeof REPORTS
  | typeof INVENTORY_MANAGEMENT
  | typeof ACCOUNT_MANAGEMENT;
