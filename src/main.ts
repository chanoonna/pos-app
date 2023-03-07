import path from 'path';
import { app, BrowserWindow } from 'electron';
import { DIST_BUILD } from '../configs/paths';
import { closeDatabase, startDatabase } from './database';
import { startIpcMain } from './ipc';

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(DIST_BUILD, 'preload.js')
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  win.loadURL('http://localhost:3000/index.html');
  // win.loadURL(`file://${path.join(__dirname, 'index.html')}`);

  win.on('ready-to-show', () => {
    win.show();
  });

  win.on('close', () => {
    closeDatabase().then(() => {
      console.log('Closing the app...');
    });
  });
};

startDatabase();
startIpcMain();

const closeWindow = () => {
  if (process.platform !== 'darwin') app.quit();
};

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', closeWindow);
