/* ---------------------------------- types --------------------------------- */
import type { StoreInfoDB } from './types';

/* --------------------------------- imports -------------------------------- */
import fs from 'fs';
import { RequestResult } from '../types';
import { printRequestLog, printResultLog } from '../utils';

const defaultStoreInfo: StoreInfoDB = {
  store_name: '',
  store_address1: '',
  store_address2: '',
  store_city: '',
  store_province: '',
  store_postal_code: '',
  store_phone_number: '',
  store_fax_number: '',
  store_email: '',
  store_website: ''
};

const FILE_NAME = 'store.txt';

export const getStoreInfo = async (): Promise<
  RequestResult<StoreInfoDB | undefined>
> => {
  const ACTION = 'getStoreInfo';

  printRequestLog({ action: ACTION });
  const { result, error } = await new Promise<{
    result?: StoreInfoDB;
    error?: Error;
  }>((resolve, reject) => {
    fs.readFile(FILE_NAME, 'utf8', async (error, data) => {
      if (error?.errno === -2) {
        await new Promise((resolve, reject) => {
          fs.writeFile(FILE_NAME, JSON.stringify(defaultStoreInfo), (error) => {
            if (error) {
              resolve({ error });
              return;
            }
            resolve({ result: defaultStoreInfo });
          });
        });

        resolve({ result: defaultStoreInfo });
        return;
      }

      resolve({
        result: JSON.parse(data),
        ...(error && {
          error: new Error('Error while getting the store information')
        })
      });
    });
  });

  printResultLog({ action: ACTION, result, error });
  return { result, userFriendlyError: error?.message };
};

export const updateStoreInfo = async ({
  params
}: {
  params: StoreInfoDB;
}): Promise<RequestResult<StoreInfoDB | undefined>> => {
  const ACTION = 'updateStoreInfo';
  printRequestLog({ action: ACTION, params });
  const error = await new Promise<Error | undefined>((resolve) => {
    fs.writeFile(FILE_NAME, JSON.stringify(params), (error) => {
      if (error) {
        resolve(new Error('Error while updating the store information'));
        return;
      }

      resolve(undefined);
    });
  });

  printResultLog({ action: ACTION, result: params, error });
  return {
    ...(error ? { userFriendlyError: error.message } : { result: params })
  };
};
