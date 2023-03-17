import {
  USERS,
  CATEGORIES,
  ITEMS,
  TAXES,
  SALES,
  SALE_ITEMS,
  SALE_TAXES,
  TAGS,
  REFUNDS,
  REFUND_ITEMS,
  REFUND_TAXES,
  LAST_USER
} from '../tablesAndColumns';

export type Table =
  | typeof USERS
  | typeof CATEGORIES
  | typeof ITEMS
  | typeof TAXES
  | typeof SALES
  | typeof SALE_ITEMS
  | typeof SALE_TAXES
  | typeof TAGS
  | typeof REFUNDS
  | typeof REFUND_ITEMS
  | typeof REFUND_TAXES
  | typeof LAST_USER;
