/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';

/* -------------------------------- constants ------------------------------- */
import {
  API_RESPONSE_CHANNEL,
  API_STARTUP,
  ERROR_UNSPECIFIED,
  CONNECT_DB,
  CHECK_TABLE_EXISTENCE,
  CREATE_TABLES
} from '../../constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { connectDatabase } from '../../database';
import { printRequestLog, printResponseLog } from '../../utils';
import { checkTables } from './checkTables';
import { createTables } from './createTables';

export const appStartupListener = () => {
  ipcMain.on(
    API_STARTUP,
    async (
      event: IpcMainEvent,
      requestAction:
        | typeof CONNECT_DB
        | typeof CHECK_TABLE_EXISTENCE
        | typeof CREATE_TABLES,
      tablesNotCreated?: string[]
    ) => {
      let result: { error?: Error | null } | undefined;
      printRequestLog({ body: { requestAction } });

      try {
        switch (requestAction) {
          case CHECK_TABLE_EXISTENCE: {
            result = await checkTables();
            break;
          }
          case CREATE_TABLES: {
            result = await createTables(tablesNotCreated);
            break;
          }
          default: {
            await connectDatabase();
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          result = { error };
        } else {
          result = { error: new Error(ERROR_UNSPECIFIED) };
        }
      }

      printResponseLog({ body: { requestAction }, ...result });
      event.reply(API_RESPONSE_CHANNEL.DB_INITIALIZATION, {
        requestBody: { requestAction },
        ...result
      });
    }
  );
};
