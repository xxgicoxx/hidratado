const {app} = require('electron');
const tray = require('./app/core/tray');
const worker = require('./app/worker/notification/index');

app.dock.hide();

app.setLoginItemSettings({
  openAtLogin: true
});

app.on('ready', () => {
  tray.create();
  worker.start();
});

app.on('window-all-closed', () => {
  app.quit();
});