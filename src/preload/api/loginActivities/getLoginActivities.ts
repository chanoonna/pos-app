/* ---------------------------------- types --------------------------------- */
import type { LoginActivitiesSortAttribute } from './types';

/* -------------------------------- constants ------------------------------- */
import { COLUMN, LOGIN_ACTIVITIES, TABLES, USERS } from '../tablesAndColumns';
import { DB_GET_LOGIN_ACTIVITIES } from './constants';

/* --------------------------------- imports -------------------------------- */
import { buildSortQuery, handleCatchAndPrintLog } from '../utils';
import { SortAttribute } from '../types';
import { dbAsync } from '../database';

export const getLoginActivities = async ({
  offset = 0,
  limit = 30,
  sortAttributes,
  includeTotal = false
}: {
  offset?: number;
  limit?: number;
  sortAttributes?: SortAttribute<LoginActivitiesSortAttribute>;
  includeTotal?: boolean;
}): Promise<{
  loginActivities?: any[];
  error?: Error;
  userFriendlyError?: string;
  total?: number;
}> => {
  const params: (string | number)[] = [];
  const selectQuery = `SELECT ${USERS}.${COLUMN[USERS].id}, ${USERS}.${COLUMN[USERS].username}, ${LOGIN_ACTIVITIES}.${COLUMN[LOGIN_ACTIVITIES].date}
    FROM ${LOGIN_ACTIVITIES}
    JOIN ${USERS} ON ${LOGIN_ACTIVITIES}.${COLUMN[LOGIN_ACTIVITIES].user_id} = ${USERS}.${COLUMN[USERS].id}`;

  const sortQuery = sortAttributes ? buildSortQuery(sortAttributes) : '';
  const paginationQuery = 'LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const query = `${selectQuery}
  ${sortQuery}
  ${paginationQuery}`;

  try {
    const result = await dbAsync.all<any[]>({ query, params });
    const resultTotal = await dbAsync.get<{ total: number }>({
      query: `SELECT COUNT(*) as total FROM ${LOGIN_ACTIVITIES}`
    });

    // await dbAsync.run({
    //   query: `UPDATE users
    //   SET language = '', column2 = 'new_value2', ...
    //   WHERE id = 123`
    // });

    return {
      loginActivities: result.rows,
      error: result.error,
      ...(includeTotal &&
        resultTotal.row?.total && { total: resultTotal.row.total })
    };
  } catch (error) {
    return {
      error: handleCatchAndPrintLog(error, DB_GET_LOGIN_ACTIVITIES),
      userFriendlyError: `Error while getting login_activities.`
    };
  }
};
