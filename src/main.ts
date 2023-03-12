import path from 'path';
import { app, BrowserWindow } from 'electron';
import { DIST_BUILD } from '../configs/paths';
import { closeDatabase } from './preload/api/connect';
import { initiateDatabase } from './preload/api/apiMainHandler';

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(DIST_BUILD, 'preload.js')
    }
  });

  initiateDatabase();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  win.loadURL('http://localhost:8080');
  // win.loadURL(`file://${path.join(__dirname, 'index.html')}`);

  win.on('ready-to-show', () => {
    win.show();
  });

  win.on('close', () => {
    closeDatabase()
      .then((message) => {
        console.log(message.log);
        console.log('Closing the app...');
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const closeWindow = () => {
  if (process.platform !== 'darwin') app.quit();
};

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', closeWindow);
