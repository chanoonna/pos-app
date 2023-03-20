/* ---------------------------------- types --------------------------------- */
import type { IpcMainInvokeEvent } from 'electron';
import type { RequestAction } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, ERROR_UNSPECIFIED } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleCatchAndPrintLog } from './utils';
import { connect } from './connect';
import { createUser, login } from './users';
import { getSettings, updateSettings } from './settings';

export const startApiRequestHandlers = () => {
  ipcMain.handle(
    API,
    async (_event: IpcMainInvokeEvent, { action, params }: RequestAction) => {
      try {
        switch (action) {
          /* --------------------------------- connect -------------------------------- */
          case 'connect': {
            const { result, userFriendlyError } = await connect();

            return {
              response: result,
              error: userFriendlyError
            };
          }

          /* ---------------------------------- users --------------------------------- */
          case 'createUser': {
            const { result, userFriendlyError } = await createUser({
              params
            });

            return {
              response: result,
              error: userFriendlyError
            };
          }
          case 'login': {
            const { result, userFriendlyError } = await login({ params });

            return {
              response: result,
              error: userFriendlyError
            };
          }

          /* -------------------------------- settings -------------------------------- */
          case 'getSettings': {
            const { result, userFriendlyError } = await getSettings();
            return {
              response: result,
              error: userFriendlyError
            };
          }
          case 'updateSettings': {
            const { result, userFriendlyError } = await updateSettings({
              params
            });
            return {
              response: result,
              error: userFriendlyError
            };
          }

          /* --------------------------------- default -------------------------------- */
          default: {
            const error = new Error(`Invalid request action: ${action}`);

            return {
              error: error.message
            };
          }
        }
      } catch (error) {
        const userFriendlyError = `${ERROR_UNSPECIFIED} while processing the request for ${action}}`;
        return {
          error: handleCatchAndPrintLog({
            action,
            error,
            alternateMessage: userFriendlyError
          }),
          userFriendlyError
        };
      }
    }
  );
};

export const closeApiRequestHandlers = () => {
  ipcMain.removeHandler(API);
};
