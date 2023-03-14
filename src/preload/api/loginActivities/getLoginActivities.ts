/* ---------------------------------- types --------------------------------- */
import type { LoginActivitiesSortAttribute } from './types';

/* -------------------------------- constants ------------------------------- */
import { LOGIN_ACTIVITIES } from '../tablesAndColumns';
import { GET_LOGIN_ACTIVITIES } from './constants';

/* --------------------------------- imports -------------------------------- */
import {
  buildSortQuery,
  handleCatchAndPrintLog,
  printResultLog
} from '../utils';
import { SortAttribute } from '../types';
import { dbAsync } from '../database';

export const getLoginActivities = async ({
  offset = 0,
  limit = 30,
  sortAttributes
}: {
  offset?: number;
  limit?: number;
  sortAttributes?: SortAttribute<LoginActivitiesSortAttribute>;
}): Promise<{
  activities?: any[];
  error?: Error;
  userFriendlyError?: string;
}> => {
  const params: (LoginActivitiesSortAttribute | string)[] = [];
  const selectQuery = `
    SELECT *,
      (SELECT COUNT(*) FROM ${LOGIN_ACTIVITIES}) as total`;
  const sortQuery = sortAttributes
    ? buildSortQuery(params, sortAttributes)
    : '';
  const paginationQuery = 'LIMIT ? OFFSET ?';
  params.push(limit.toString(), offset.toString());

  const query = `
    ${selectQuery}
    ${sortQuery}
    ${paginationQuery};`;

  try {
    const { row, error } = await dbAsync.get<any[]>({ query, params });

    return {
      activities: row,
      error
    };
  } catch (error) {
    return {
      error: handleCatchAndPrintLog(error, GET_LOGIN_ACTIVITIES),
      userFriendlyError: `Error while getting login_activities.`
    };
  }
};
