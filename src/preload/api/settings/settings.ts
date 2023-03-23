/* ---------------------------------- types --------------------------------- */
import type { SettingsDB, UpdateSettingsParamsDB } from './types';

/* --------------------------------- imports -------------------------------- */
import fs from 'fs';
import { RequestResult } from '../types';
import { printRequestLog, printResultLog } from '../utils';
import merge from 'lodash/merge';

const defaultSettings: SettingsDB = {
  language: 'ENGLISH',
  ui_size: 'large',
  color_theme: 'bright'
};

const FILE_NAME = 'settings.txt';

export const getSettings = async (): Promise<
  RequestResult<SettingsDB | undefined>
> => {
  const ACTION = 'getSettings';

  printRequestLog({ action: ACTION });
  const { result, error } = await new Promise<{
    result?: SettingsDB;
    error?: Error;
  }>((resolve, reject) => {
    fs.readFile(FILE_NAME, 'utf8', async (error, data) => {
      if (error?.errno === -2) {
        await new Promise((resolve, reject) => {
          fs.writeFile(FILE_NAME, JSON.stringify(defaultSettings), (error) => {
            if (error) {
              resolve({ error });
              return;
            }
            resolve({ result: defaultSettings });
          });
        });

        resolve({ result: defaultSettings });
        return;
      }

      resolve({
        ...(data && { result: JSON.parse(data) }),
        ...(error && {
          error: new Error('Error while getting the settings')
        })
      });
    });
  });

  printResultLog({ action: ACTION, result, error });
  return { result, userFriendlyError: error?.message };
};

export const updateSettings = async ({
  params
}: {
  params: UpdateSettingsParamsDB;
}): Promise<RequestResult<SettingsDB | undefined>> => {
  const ACTION = 'updateSettings';
  printRequestLog({ action: ACTION, params });

  const { result: previousSettings, error: fileReadError } = await new Promise<{
    result?: SettingsDB;
    error?: Error;
  }>((resolve) => {
    fs.readFile(FILE_NAME, 'utf8', (error, data) => {
      if (error) {
        resolve({ error: new Error('Error while updating the settings') });
        return;
      }

      resolve({ result: JSON.parse(data) });
    });
  });

  const mergedSettings = merge({}, previousSettings, params);

  console.log(previousSettings, mergedSettings);

  const error = await new Promise<Error | undefined>((resolve) => {
    fs.writeFile(FILE_NAME, JSON.stringify(mergedSettings), (error) => {
      if (error) {
        resolve(new Error('Error while updating the settings'));
        return;
      }

      resolve(undefined);
    });
  });

  printResultLog({ action: ACTION, result: params, error });

  return {
    ...(error
      ? { userFriendlyError: error.message }
      : { result: mergedSettings })
  };
};
