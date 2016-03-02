'use strict';

const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });
  mainWindow.loadURL('file://' + __dirname + '/../index.html');
  mainWindow.webContents.openDevTools();
});
