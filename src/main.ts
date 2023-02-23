import { app, BrowserWindow } from 'electron';
// import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
      // preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('../index.html');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
};

const closeWindow = () => {
  if (process.platform !== 'darwin') app.quit();
};

app.on('ready', createWindow);
app.on('window-all-closed', closeWindow);
