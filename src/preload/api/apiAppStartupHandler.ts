/* -------------------------------- constants ------------------------------- */
import {
  API_STARTUP,
  CHECK_TABLE_EXISTENCE,
  CONNECT_DB,
  CREATE_TABLES
} from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiAppStartupHandler = {
  connect: () => {
    ipcRenderer.send(API_STARTUP, CONNECT_DB);
  },
  checkTables: () => {
    ipcRenderer.send(API_STARTUP, CHECK_TABLE_EXISTENCE);
  },
  createTables: () => {
    ipcRenderer.send(API_STARTUP, CREATE_TABLES);
  }
};
