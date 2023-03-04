import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(':memory:');

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../dist/app/preload/preload.js')
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  win.loadURL('http://localhost:3000/index.html');

  win.on('ready-to-show', () => {
    win.show();
  });
};

const closeWindow = () => {
  if (process.platform !== 'darwin') app.quit();
};

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', closeWindow);
