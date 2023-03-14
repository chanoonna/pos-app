import type { SortAttribute } from '../types';
import {
  SORTBY_username,
  SORTBY_loginTime,
  SORTBY_logoutTime,
  SORTBY_duration
} from './constants';

export type LoginActivitiesSortAttribute =
  | typeof SORTBY_username
  | typeof SORTBY_loginTime
  | typeof SORTBY_logoutTime
  | typeof SORTBY_duration;
