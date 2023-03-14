/* ---------------------------------- types --------------------------------- */
import type { Method, Route } from '../types';
import { printRequestLog, printResultLog } from '../utils';

/* --------------------------------- imports -------------------------------- */
import { getLoginActivities } from './getLoginActivities';

export const handleLoginActivities = async ({
  route,
  method,
  params
}: {
  route: Route;
  method: Method;
  params: any;
}) => {
  printRequestLog({
    method,
    params,
    route
  });

  let result:
    | { activities?: any[]; error?: Error; userFriendlyError?: string }
    | undefined;

  switch (method) {
    case 'GET': {
      result = await getLoginActivities(params);
    }

    default: {
      const error = new Error(
        `Method ${method} not supported for route ${route}`
      );

      result = await Promise.resolve({
        error,
        userFriendlyError: error.message
      });
    }
  }

  printResultLog({
    method,
    params,
    route,
    error: result.error
  });

  return result;
};
