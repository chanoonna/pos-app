/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';
import type { Method } from '../types';

/* -------------------------------- constants ------------------------------- */
import { API_CHANNEL } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { connectDatabase } from '../connect';

export const handleInitialization = async (
  event: IpcMainEvent,
  {
    method,
    requestAction,
    body
  }: {
    method: Method;
    requestAction: string;
    body: any;
  }
) => {
  switch (requestAction) {
  }
  try {
    const res = await connectDatabase();
  } catch (error) {
    event.reply(API_CHANNEL.DB_INITIALIZATION, {
      requestAction,
      error
    });
    return;
  }
  event.reply(API_CHANNEL.DB_INITIALIZATION, {
    requestAction
  });
};
